/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

const models = require('./index');

/**
 * Class representing a TeamAppResponse.
 * @extends models['TeamResponse']
 */
class TeamAppResponse extends models['TeamResponse'] {
  /**
   * Create a TeamAppResponse.
   * @member {array} [permissions] The permissions the team has for the app
   */
  constructor() {
    super();
  }

  /**
   * Defines the metadata of TeamAppResponse
   *
   * @returns {object} metadata of TeamAppResponse
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'TeamAppResponse',
      type: {
        name: 'Composite',
        className: 'TeamAppResponse',
        modelProperties: {
          id: {
            required: true,
            serializedName: 'id',
            type: {
              name: 'String'
            }
          },
          name: {
            required: true,
            serializedName: 'name',
            type: {
              name: 'String'
            }
          },
          displayName: {
            required: true,
            serializedName: 'display_name',
            type: {
              name: 'String'
            }
          },
          description: {
            required: false,
            serializedName: 'description',
            type: {
              name: 'String'
            }
          },
          permissions: {
            required: false,
            serializedName: 'permissions',
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'StringElementType',
                  type: {
                    name: 'String'
                  }
              }
            }
          }
        }
      }
    };
  }
}

module.exports = TeamAppResponse;