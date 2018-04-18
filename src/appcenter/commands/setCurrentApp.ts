import * as vscode from "vscode";
import { AppCenterOS, Constants } from "../../constants";
import { CommandParams, CurrentApp, CurrentAppDeployments } from "../../helpers/interfaces";
import { Utils } from "../../helpers/utils";
import { VsCodeUtils } from "../../helpers/vsCodeUtils";
import { Strings } from "../../strings";
import { models } from "../apis";
import { Deployment } from "../apis/generated/models";
import { ReactNativeAppCommand } from './reactNativeAppCommand';

export default class SetCurrentApp extends ReactNativeAppCommand {
    constructor(params: CommandParams) {
        super(params);
    }

    public async run(): Promise<void> {
        if (!await super.run()) {
            return;
        }
        this.showAppsQuickPick(this.CachedApps);
        this.refreshCachedAppsAndRepaintQuickPickIfNeeded();
    }

    protected async handleShowCurrentAppQuickPickSelection(target: string, rnApps: models.AppResponse[]) {
        const selectedApps: models.AppResponse[] = rnApps.filter(app => app.name === target);
        if (!selectedApps || selectedApps.length !== 1) {
            return;
        }
        const selectedApp: models.AppResponse = selectedApps[0];
        const selectedAppName: string = `${selectedApp.owner.name}/${selectedApp.name}`;
        const selectedAppSecret: string = selectedApp.appSecret;
        const type: string = selectedApp.owner.type;

        const OS: AppCenterOS | undefined = Utils.toAppCenterOS(selectedApp.os);
        if (!OS) {
            this.logger.error(`Couldn't recognize os ${selectedApp.os} returned from CodePush server.`);
            return;
        }
        try {
            vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: "Get Deployments" }, p => {
                p.report({ message: Strings.FetchDeploymentsStatusBarMessage });
                return this.client.codePushDeployments.list(selectedApp.owner.name, selectedApp.name);
            }).then((deployments: models.Deployment[]) => {
                return deployments.sort((a, b): any => {
                    return a.name < b.name; // sort alphabetically
                });
            }).then((appDeployments: models.Deployment[]) => {
                let currentDeployments: CurrentAppDeployments | null = null;
                if (appDeployments.length > 0) {
                    const deployments: Deployment[] = appDeployments.map((d) => {
                        return {
                            name: d.name
                        };
                    });
                    currentDeployments = {
                        codePushDeployments: deployments,
                        currentDeploymentName: appDeployments[0].name // Select 1st one by default
                    };
                }
                return this.saveCurrentApp(
                    selectedAppName,
                    OS,
                    currentDeployments,
                    Constants.AppCenterDefaultTargetBinaryVersion,
                    type,
                    Constants.AppCenterDefaultIsMandatoryParam,
                    selectedAppSecret
                );
            }).then((app: CurrentApp | null) => {
                if (app) {
                    const message = Strings.YourCurrentAppAndDeploymentMsg(target, app.currentAppDeployments.currentDeploymentName);
                    VsCodeUtils.ShowInfoMessage(message);
                } else {
                    this.logger.error("Failed to save current app");
                }
            });
        } catch (e) {
            this.logger.error("Failed to save current app");
        }
    }
}
