/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

const models = require('./index');

/**
 * Set or remove custom properties.
 *
 * @extends models['LogFlowLog']
 */
class LogFlowCustomPropertyLog extends models['LogFlowLog'] {
  /**
   * Create a LogFlowCustomPropertyLog.
   * @member {array} [properties] Custom property changes.
   */
  constructor() {
    super();
  }

  /**
   * Defines the metadata of LogFlowCustomPropertyLog
   *
   * @returns {object} metadata of LogFlowCustomPropertyLog
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'custom_properties',
      type: {
        name: 'Composite',
        polymorphicDiscriminator: {
          serializedName: 'type',
          clientName: 'type'
        },
        uberParent: 'LogFlowLog',
        className: 'LogFlowCustomPropertyLog',
        modelProperties: {
          timestamp: {
            required: true,
            serializedName: 'timestamp',
            type: {
              name: 'DateTime'
            }
          },
          installId: {
            required: true,
            serializedName: 'install_id',
            type: {
              name: 'String'
            }
          },
          device: {
            required: true,
            serializedName: 'device',
            type: {
              name: 'Composite',
              className: 'LogFlowDevice'
            }
          },
          type: {
            required: true,
            serializedName: 'type',
            isPolymorphicDiscriminator: true,
            type: {
              name: 'String'
            }
          },
          properties: {
            required: false,
            serializedName: 'properties',
            constraints: {
              MaxItems: 60,
              MinItems: 1
            },
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'LogFlowCustomPropertyElementType',
                  type: {
                    name: 'Composite',
                    polymorphicDiscriminator: {
                      serializedName: 'type',
                      clientName: 'type'
                    },
                    uberParent: 'LogFlowCustomProperty',
                    className: 'LogFlowCustomProperty'
                  }
              }
            }
          }
        }
      }
    };
  }
}

module.exports = LogFlowCustomPropertyLog;