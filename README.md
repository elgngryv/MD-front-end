# Müasir stomatologiya - Front-end

## Describtion:

_Front-end code for the 'Müasir Stomatologiya' clinic website, featuring a responsive UI with sections like services, doctor profiles, and appointment booking. Built with HTML, CSS, and JavaScript for a modern, user-friendly experience!🚀_



{
  "openapi": "3.0.1",
  "info": {
    "title": "Movie-API",
    "description": "This API exposes endpoints to manage tutorials.",
    "termsOfService": "https://www.bezkoder.com/terms",
    "contact": {
      "name": "BezKoder",
      "url": "https://www.bezkoder.com",
      "email": "bezkoder@gmail.com"
    },
    "version": "1.0"
  },
  "servers": [
    {
      "url": "http://83.171.249.199:5555",
      "description": "Generated server url"
    }
  ],
  "security": [
    {
      "Authorization": []
    }
  ],
  "paths": {
    "/api/v1/workers-work-schedule/update": {
      "put": {
        "tags": [
          "workers-work-schedule-controller"
        ],
        "operationId": "update",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/WorkersWorkScheduleUpdateDTO"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/WorkersWorkScheduleUpdateDTO"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-removal-product/update": {
      "put": {
        "tags": [
          "warehouse-removal-product-controller"
        ],
        "operationId": "update_1",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/WarehouseRemovalProductUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/WarehouseRemovalCreateResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-receipts/pending-status-updated": {
      "put": {
        "tags": [
          "warehouse-receipts-controller"
        ],
        "operationId": "update_2",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/WarehouseReceiptsStatusUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/WarehouseReceiptsResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-entry/update": {
      "put": {
        "tags": [
          "warehouse-entry-controller"
        ],
        "operationId": "update_3",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/WarehouseEntryUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/WarehouseEntryCreateResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/teeth/update": {
      "put": {
        "tags": [
          "teeth-controller"
        ],
        "operationId": "update_4",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTeethRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/TeethUpdateResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/teeth-operation/update": {
      "put": {
        "tags": [
          "teeth-operation-controller"
        ],
        "operationId": "update_5",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTeethOperationRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/TeethOperationResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/teeth-examination/update": {
      "put": {
        "tags": [
          "teeth-examination-controller"
        ],
        "operationId": "update_6",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TeethExaminationUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/TeethExaminationResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/technician/update/{id}": {
      "put": {
        "tags": [
          "technician-controller"
        ],
        "operationId": "update_7",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TechnicianUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/specialization/update": {
      "put": {
        "tags": [
          "specialization-category-controller"
        ],
        "operationId": "updateSpecializationCategory",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SpecializationCategoryUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/SpecializationCategoryResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/reservations/update/{id}": {
      "put": {
        "tags": [
          "reservation-controller"
        ],
        "operationId": "update_8",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ReservationUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ReservationUpdateResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/recipe/update/{id}": {
      "put": {
        "tags": [
          "recipe-controller"
        ],
        "operationId": "update_9",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RecipeUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/product/update": {
      "put": {
        "tags": [
          "product-controller"
        ],
        "operationId": "update_10",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProductUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ProductResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/product/status-updated": {
      "put": {
        "tags": [
          "product-controller"
        ],
        "operationId": "statusUpdated",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProductUpdatedStatusRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ProductReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/product-category/update": {
      "put": {
        "tags": [
          "product-category-controller"
        ],
        "operationId": "update_11",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProductCategoryUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ProductCategoryResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/product-category/status-updated": {
      "put": {
        "tags": [
          "product-category-controller"
        ],
        "operationId": "statusUpdated_1",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProductCategoryStatusUpdatedRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ProductCategoryResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/price-categories/update/{id}": {
      "put": {
        "tags": [
          "price-category-controller"
        ],
        "operationId": "update_12",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PriceCategoryUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/permission/update": {
      "put": {
        "tags": [
          "permission-controller"
        ],
        "operationId": "update_13",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PermissionUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PermissionCreateResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/permission/status-updated": {
      "put": {
        "tags": [
          "permission-controller"
        ],
        "operationId": "statusUpdated_2",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PermissionStatusUpdatedRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PermissionResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient/update": {
      "put": {
        "tags": [
          "patient-controller"
        ],
        "operationId": "update_14",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatientUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PatientUpdateResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-xray/update/{id}": {
      "put": {
        "tags": [
          "patient-xray-controller"
        ],
        "operationId": "update_15",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "required": [
                  "data",
                  "file"
                ],
                "type": "object",
                "properties": {
                  "data": {
                    "$ref": "#/components/schemas/PatXrayUpdateReq"
                  },
                  "file": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-videos/update/{id}": {
      "put": {
        "tags": [
          "patient-videos-controller"
        ],
        "operationId": "update_16",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "required": [
                  "data",
                  "file"
                ],
                "type": "object",
                "properties": {
                  "data": {
                    "$ref": "#/components/schemas/PatVideosUpdateReq"
                  },
                  "file": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-recipes/update/{id}": {
      "put": {
        "tags": [
          "patient-recipe-controller"
        ],
        "operationId": "update_17",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatRecipeUpdateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-plans/update": {
      "put": {
        "tags": [
          "patient-plans-controller"
        ],
        "operationId": "update_18",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatientPlanUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PatientPlansResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-plans-main/update": {
      "put": {
        "tags": [
          "patient-plans-main-controller"
        ],
        "operationId": "updateMain",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatientPlansMainUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PatientPlansMainResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-photos/update/{id}": {
      "put": {
        "tags": [
          "patient-photos-controller"
        ],
        "operationId": "update_19",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "required": [
                  "data",
                  "file"
                ],
                "type": "object",
                "properties": {
                  "data": {
                    "$ref": "#/components/schemas/PatPhotosUpdateReq"
                  },
                  "file": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-insurance/update/{id}": {
      "put": {
        "tags": [
          "patient-insurance-controller"
        ],
        "operationId": "update_20",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatInsuranceUpdateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-insurance-balance/update/{id}": {
      "put": {
        "tags": [
          "patient-insurance-balance-controller"
        ],
        "operationId": "update_21",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "required": [
                  "file",
                  "obj"
                ],
                "type": "object",
                "properties": {
                  "obj": {
                    "$ref": "#/components/schemas/PatInsuranceBalanceUpdateReq"
                  },
                  "file": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-examinations/update": {
      "put": {
        "tags": [
          "patient-examinations-controller"
        ],
        "operationId": "update_22",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatientExaminationsUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PatientExaminationsCreateResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-anamnesis/update/{id}": {
      "put": {
        "tags": [
          "patient-anamnesis-controller"
        ],
        "operationId": "update_23",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatAnamnesisUpdateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/order-from-warehouse/update": {
      "put": {
        "tags": [
          "order-from-warehouse-controller"
        ],
        "operationId": "update_24",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/OrderFromWarehouseUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/OrderFromWarehouseResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/operation-types/update/{id}": {
      "put": {
        "tags": [
          "operation-type-controller"
        ],
        "operationId": "update_25",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/OpTypeUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/operation-type-items/update/{id}": {
      "put": {
        "tags": [
          "operation-type-item-controller"
        ],
        "operationId": "update_26",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/OpTypeItemUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/metal/update/{id}": {
      "put": {
        "tags": [
          "metal-controller"
        ],
        "operationId": "update_27",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateMetalReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/medicine/update/{id}": {
      "put": {
        "tags": [
          "medicine-controller"
        ],
        "operationId": "update_28",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MedicineUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/laboratory/order/update": {
      "put": {
        "tags": [
          "dental-order-controller"
        ],
        "operationId": "update_29",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTechnicianOrderReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/insurance-company/update/{id}": {
      "put": {
        "tags": [
          "insurance-company-controller"
        ],
        "operationId": "update_30",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateICRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/implant/update": {
      "put": {
        "tags": [
          "implant-controller"
        ],
        "operationId": "update_31",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ImplantUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ImplantResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/implant/status-update": {
      "put": {
        "tags": [
          "implant-controller"
        ],
        "operationId": "statusUpdate",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ImplantStatusUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "enum": [
                    "ACTIVE",
                    "PASSIVE"
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/implant-size/update": {
      "put": {
        "tags": [
          "implant-size-controller"
        ],
        "operationId": "update_32",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ImplantSizeUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ImplantSizeResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/implant-size/status-updated": {
      "put": {
        "tags": [
          "implant-size-controller"
        ],
        "operationId": "statusUpdated_3",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ImplantSizeStatusUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "enum": [
                    "ACTIVE",
                    "PASSIVE"
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/general-calendar/update-appointment": {
      "put": {
        "tags": [
          "general-calendar-controller"
        ],
        "operationId": "updateAppointment",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateAppointmentRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/NewAppointmentResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/garnitures/update/{id}": {
      "put": {
        "tags": [
          "garniture-controller"
        ],
        "operationId": "update_33",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateGarnitureReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/examination/update": {
      "put": {
        "tags": [
          "examination-controller"
        ],
        "operationId": "update_34",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ExaminationUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ExaminationResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/examination/update-status": {
      "put": {
        "tags": [
          "examination-controller"
        ],
        "operationId": "updateStatus",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ExaminationRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ExaminationResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/deletion-from-warehouse/update": {
      "put": {
        "tags": [
          "deletion-from-warehouse-controller"
        ],
        "operationId": "update_35",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeletionFromWarehouseUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/DeletionFromWarehouseReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/color/update/{id}": {
      "put": {
        "tags": [
          "color-controller"
        ],
        "operationId": "update_36",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateColorReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/ceramic/update/{id}": {
      "put": {
        "tags": [
          "ceramic-controller"
        ],
        "operationId": "update_37",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateCeramicReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/cabinet/update": {
      "put": {
        "tags": [
          "cabinet-controller"
        ],
        "operationId": "update_38",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CabinetUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/CabinetResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/cabinet/status-updated": {
      "put": {
        "tags": [
          "cabinet-controller"
        ],
        "operationId": "statusUpdated_4",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CabinetStatusUpdatedRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/CabinetStatusUpdatedResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/blacklist-results/update/{id}": {
      "put": {
        "tags": [
          "black-list-result"
        ],
        "operationId": "update_39",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateBlacklistResultReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/appointment-type/update": {
      "put": {
        "tags": [
          "appointment-type-controller"
        ],
        "operationId": "update_40",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AppointmentTypeUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/AppointmentTypeResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/appointment-type/status-updated": {
      "put": {
        "tags": [
          "appointment-type-controller"
        ],
        "operationId": "statusUpdated_5",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProductCategoryStatusUpdatedRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/AppointmentTypeResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/anamnesis-list/update/{id}": {
      "put": {
        "tags": [
          "anamnesis-list-controller"
        ],
        "operationId": "update_41",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateAnemnesisListReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/anamnesis-categories/update/{id}": {
      "put": {
        "tags": [
          "anamnesis-category-controller"
        ],
        "operationId": "update_42",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateAnemnesisCatReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/add-worker/update": {
      "put": {
        "tags": [
          "add-worker-controller"
        ],
        "operationId": "update_43",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddWorkerUpdateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/AddWorkerUpdateResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/workers-work-schedule/search": {
      "post": {
        "tags": [
          "workers-work-schedule-controller"
        ],
        "operationId": "search",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/WorkersWorkScheduleSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WorkersWorkScheduleResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/workers-work-schedule/create": {
      "post": {
        "tags": [
          "workers-work-schedule-controller"
        ],
        "operationId": "create",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/WorkersWorkScheduleRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/warehouse/search-warehouse": {
      "post": {
        "tags": [
          "warehouse-controller"
        ],
        "operationId": "search_1",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/WarehouseSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WarehouseReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-removal/search": {
      "post": {
        "tags": [
          "warehouse-removal-controller"
        ],
        "operationId": "search_2",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/WarehouseRemovalProductSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WarehouseRemovalReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-removal-product/search": {
      "post": {
        "tags": [
          "warehouse-removal-product-controller"
        ],
        "operationId": "search_3",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/WarehouseRemovalProductSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WarehouseRemovalProductReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-removal-product/create": {
      "post": {
        "tags": [
          "warehouse-removal-product-controller"
        ],
        "operationId": "create_1",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/WarehouseRemovalCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/WarehouseRemovalCreateResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-receipts/search": {
      "post": {
        "tags": [
          "warehouse-receipts-controller"
        ],
        "operationId": "search_4",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/WarehouseReceiptsRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WarehouseReceiptsResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-entry/search": {
      "post": {
        "tags": [
          "warehouse-entry-controller"
        ],
        "operationId": "search_5",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/WarehouseEntrySearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WarehouseEntryReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-entry/create": {
      "post": {
        "tags": [
          "warehouse-entry-controller"
        ],
        "operationId": "create_2",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/WarehouseEntryCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/WarehouseEntryCreateResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/teeth/search": {
      "post": {
        "tags": [
          "teeth-controller"
        ],
        "operationId": "search_6",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TeethRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TeethResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/teeth/create": {
      "post": {
        "tags": [
          "teeth-controller"
        ],
        "operationId": "create_3",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateTeethRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/teeth-operation/search": {
      "post": {
        "tags": [
          "teeth-operation-controller"
        ],
        "operationId": "search_7",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SearchTeethOperationRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TeethOperationResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/teeth-operation/create": {
      "post": {
        "tags": [
          "teeth-operation-controller"
        ],
        "operationId": "create_4",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateTeethOperationRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/teeth-examination/search": {
      "post": {
        "tags": [
          "teeth-examination-controller"
        ],
        "operationId": "search_8",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TeethExaminationSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TeethExaminationResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/teeth-examination/create": {
      "post": {
        "tags": [
          "teeth-examination-controller"
        ],
        "operationId": "create_5",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TeethExaminationRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/TeethExaminationResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/technician/search": {
      "post": {
        "tags": [
          "technician-controller"
        ],
        "operationId": "search_9",
        "parameters": [
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/TechnicianSearchRequest"
            }
          },
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseTechnicianReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/technician/create": {
      "post": {
        "tags": [
          "technician-controller"
        ],
        "operationId": "create_6",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TechnicianCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/specialization/create": {
      "post": {
        "tags": [
          "specialization-category-controller"
        ],
        "operationId": "createSpecializationCategory",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SpecializationCategoryCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/SpecializationCategoryResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/room-stock/search": {
      "post": {
        "tags": [
          "room-stock-controller"
        ],
        "operationId": "search_10",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RoomStockRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/RoomStockResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/reservations/search": {
      "post": {
        "tags": [
          "reservation-controller"
        ],
        "operationId": "search_11",
        "parameters": [
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/ReservationSearchRequest"
            }
          },
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseReservationReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/reservations/create": {
      "post": {
        "tags": [
          "reservation-controller"
        ],
        "operationId": "create_7",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ReservationCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ReservationCreateResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/recipe/create": {
      "post": {
        "tags": [
          "recipe-controller"
        ],
        "operationId": "create_8",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RecipeCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/product/search": {
      "post": {
        "tags": [
          "product-controller"
        ],
        "operationId": "search_12",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProductSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ProductReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/product/create": {
      "post": {
        "tags": [
          "product-controller"
        ],
        "operationId": "create_9",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProductRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ProductResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/product-category/search": {
      "post": {
        "tags": [
          "product-category-controller"
        ],
        "operationId": "search_13",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProductCategorySearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ProductCategoryResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/product-category/create": {
      "post": {
        "tags": [
          "product-category-controller"
        ],
        "operationId": "create_10",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ProductCategoryRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ProductCategoryResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/price-categories/create": {
      "post": {
        "tags": [
          "price-category-controller"
        ],
        "operationId": "create_11",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PriceCategoryCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/permission/search": {
      "post": {
        "tags": [
          "permission-controller"
        ],
        "operationId": "search_14",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PermissionSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PermissionResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/permission/create": {
      "post": {
        "tags": [
          "permission-controller"
        ],
        "operationId": "create_12",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PermissionCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PermissionResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient/search": {
      "post": {
        "tags": [
          "patient-controller"
        ],
        "operationId": "search_15",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatientSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatientReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient/create": {
      "post": {
        "tags": [
          "patient-controller"
        ],
        "operationId": "create_13",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatientCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PatientCreateResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-xray/create": {
      "post": {
        "tags": [
          "patient-xray-controller"
        ],
        "operationId": "create_14",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "required": [
                  "data",
                  "file"
                ],
                "type": "object",
                "properties": {
                  "data": {
                    "$ref": "#/components/schemas/PatXrayCreateReq"
                  },
                  "file": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-videos/create": {
      "post": {
        "tags": [
          "patient-videos-controller"
        ],
        "operationId": "create_15",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "required": [
                  "data",
                  "file"
                ],
                "type": "object",
                "properties": {
                  "data": {
                    "$ref": "#/components/schemas/PatVideosCreateReq"
                  },
                  "file": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-treatment/save": {
      "post": {
        "tags": [
          "patient-treatment-controller"
        ],
        "operationId": "save",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatientTreatmentSaveRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-treatment/read-by-plan-main-id-of-treatment/{planMainId}": {
      "post": {
        "tags": [
          "patient-treatment-controller"
        ],
        "operationId": "read",
        "parameters": [
          {
            "name": "planMainId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ReadByPatientPlanMainIdOfTreatment"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-treatment/read-by-category-of-plan-main/{id}": {
      "post": {
        "tags": [
          "patient-treatment-controller"
        ],
        "operationId": "readByCategoryOfPlanMain",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/CategoryOfOperationDto"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-treatment/create": {
      "post": {
        "tags": [
          "patient-treatment-controller"
        ],
        "operationId": "create_16",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatientTreatmentRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-recipes/create": {
      "post": {
        "tags": [
          "patient-recipe-controller"
        ],
        "operationId": "create_17",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatRecipeCreateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-plans/read-category-and-operations/{insuranceId}": {
      "post": {
        "tags": [
          "patient-plans-controller"
        ],
        "operationId": "readCategoryAndOperations",
        "parameters": [
          {
            "name": "insuranceId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/CategoryOfOperationDto"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-plans/delete/{id}": {
      "post": {
        "tags": [
          "patient-plans-controller"
        ],
        "operationId": "delete",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-plans/create": {
      "post": {
        "tags": [
          "patient-plans-controller"
        ],
        "operationId": "create_18",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatientPlansCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PatientPlansResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-plans-main/save/{id}": {
      "post": {
        "tags": [
          "patient-plans-main-controller"
        ],
        "operationId": "save_1",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-plans-main/create": {
      "post": {
        "tags": [
          "patient-plans-main-controller"
        ],
        "operationId": "createMain",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatientPlansMainCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PatientPlansMainResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-photos/create": {
      "post": {
        "tags": [
          "patient-photos-controller"
        ],
        "operationId": "create_19",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "required": [
                  "data",
                  "file"
                ],
                "type": "object",
                "properties": {
                  "data": {
                    "$ref": "#/components/schemas/PatPhotosCreateReq"
                  },
                  "file": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-insurance/create": {
      "post": {
        "tags": [
          "patient-insurance-controller"
        ],
        "operationId": "create_20",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatientInsuranceCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-insurance-balance/create": {
      "post": {
        "tags": [
          "patient-insurance-balance-controller"
        ],
        "operationId": "createUser",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "required": [
                  "file",
                  "obj"
                ],
                "type": "object",
                "properties": {
                  "obj": {
                    "$ref": "#/components/schemas/PatInsuranceBalanceCreateReq"
                  },
                  "file": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-examinations/see-historical-election-dental-examinations": {
      "post": {
        "tags": [
          "patient-examinations-controller"
        ],
        "operationId": "seeHistoricalElectionDentalExaminations",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RequestToSeeTheExaminations"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatientExaminationsResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-blacklist/search": {
      "post": {
        "tags": [
          "patient-blacklist-controller"
        ],
        "operationId": "search_16",
        "parameters": [
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PatBlacklistSearchReq"
            }
          },
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponsePatBlacklistReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-blacklist/create": {
      "post": {
        "tags": [
          "patient-blacklist-controller"
        ],
        "operationId": "create_21",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatBlacklistCreateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-anamnesis/create": {
      "post": {
        "tags": [
          "patient-anamnesis-controller"
        ],
        "operationId": "create_22",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatAnamnesisCreateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/order-from-warehouse/search": {
      "post": {
        "tags": [
          "order-from-warehouse-controller"
        ],
        "operationId": "search_17",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/OrderFromWarehouseSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/OrderFromWarehouseReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/order-from-warehouse/create": {
      "post": {
        "tags": [
          "order-from-warehouse-controller"
        ],
        "operationId": "create_23",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/OrderFromWarehouseCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/OrderFromWarehouseResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/operation-types/create": {
      "post": {
        "tags": [
          "operation-type-controller"
        ],
        "operationId": "create_24",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/OpTypeCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/operation-type-items/create": {
      "post": {
        "tags": [
          "operation-type-item-controller"
        ],
        "operationId": "create_25",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/OpTypeItemCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/metal/create": {
      "post": {
        "tags": [
          "metal-controller"
        ],
        "operationId": "create_26",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MetalCreateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/medicine/create": {
      "post": {
        "tags": [
          "medicine-controller"
        ],
        "operationId": "create_27",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MedicineCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/laboratory/order/create": {
      "post": {
        "tags": [
          "dental-order-controller"
        ],
        "operationId": "create_28",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DentalOrderCreateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/laboratory-payment/create": {
      "post": {
        "tags": [
          "dental-order-payment-controller"
        ],
        "operationId": "create_29",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DentalOrderPaymentCreateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/insurance-company/create": {
      "post": {
        "tags": [
          "insurance-company-controller"
        ],
        "operationId": "create_30",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InsuranceCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/implant/search": {
      "post": {
        "tags": [
          "implant-controller"
        ],
        "operationId": "search_18",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ImplantSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ImplantReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/implant/create": {
      "post": {
        "tags": [
          "implant-controller"
        ],
        "operationId": "create_31",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ImplantCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ImplantResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/implant-size/search": {
      "post": {
        "tags": [
          "implant-size-controller"
        ],
        "operationId": "search_19",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ImplantSizeSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ImplantSizeResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/implant-size/search-status": {
      "post": {
        "tags": [
          "implant-size-controller"
        ],
        "operationId": "searchStatus",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ImplantSizeSearchStatusRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ImplantSizeResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/implant-size/create": {
      "post": {
        "tags": [
          "implant-size-controller"
        ],
        "operationId": "create_32",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ImplantSizeCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ImplantSizeResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/general-calendar/new-appointment": {
      "post": {
        "tags": [
          "general-calendar-controller"
        ],
        "operationId": "newAppointment",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewAppointmentRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/NewAppointmentResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/garnitures/create": {
      "post": {
        "tags": [
          "garniture-controller"
        ],
        "operationId": "create_33",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GarnitureCreateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/examination/search": {
      "post": {
        "tags": [
          "examination-controller"
        ],
        "operationId": "search_20",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ExaminationRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ExaminationResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/examination/create": {
      "post": {
        "tags": [
          "examination-controller"
        ],
        "operationId": "createExamination",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateExaminationRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/deletion-from-warehouse/search": {
      "post": {
        "tags": [
          "deletion-from-warehouse-controller"
        ],
        "operationId": "search_21",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeletionFromWarehouseSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/DeletionFromWarehouseResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/deletion-from-warehouse/create": {
      "post": {
        "tags": [
          "deletion-from-warehouse-controller"
        ],
        "operationId": "create_34",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeletionFromWarehouseCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/DeletionFromWarehouseResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/color/create": {
      "post": {
        "tags": [
          "color-controller"
        ],
        "operationId": "create_35",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ColorCreateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/ceramic/create": {
      "post": {
        "tags": [
          "ceramic-controller"
        ],
        "operationId": "create_36",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CeramicCreateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/cabinet/search": {
      "post": {
        "tags": [
          "cabinet-controller"
        ],
        "operationId": "search_22",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CabinetSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/CabinetResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/cabinet/create": {
      "post": {
        "tags": [
          "cabinet-controller"
        ],
        "operationId": "create_37",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CabinetCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/CabinetResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/blacklist-results/create": {
      "post": {
        "tags": [
          "black-list-result"
        ],
        "operationId": "create_38",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BlacklistResultCreateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/auth/login": {
      "post": {
        "tags": [
          "auth-controller"
        ],
        "operationId": "login",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AuthRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/AuthResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/appointment-type/search": {
      "post": {
        "tags": [
          "appointment-type-controller"
        ],
        "operationId": "search_23",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AppointmentTypeSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/AppointmentTypeResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/appointment-type/create": {
      "post": {
        "tags": [
          "appointment-type-controller"
        ],
        "operationId": "create_39",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AppointmentTypeCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/AppointmentTypeResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/anamnesis-list/create": {
      "post": {
        "tags": [
          "anamnesis-list-controller"
        ],
        "operationId": "create_40",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AnemnesisListCreateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/anamnesis-categories/create": {
      "post": {
        "tags": [
          "anamnesis-category-controller"
        ],
        "operationId": "create_41",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AnemnesisCatCreateReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/add-worker/search": {
      "post": {
        "tags": [
          "add-worker-controller"
        ],
        "operationId": "search_24",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddWorkerSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/AddWorkerReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/add-worker/read-permission/{permission}": {
      "post": {
        "tags": [
          "add-worker-controller"
        ],
        "operationId": "readPermission",
        "parameters": [
          {
            "name": "permission",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/AddWorkerReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/add-worker/create": {
      "post": {
        "tags": [
          "add-worker-controller"
        ],
        "operationId": "create_42",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AddWorkerCreateRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/AddWorkerCreateResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/technician/update/status/{id}": {
      "patch": {
        "tags": [
          "technician-controller"
        ],
        "operationId": "updateStatus_1",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/reservations/update/status/{id}": {
      "patch": {
        "tags": [
          "reservation-controller"
        ],
        "operationId": "updateStatus_2",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/recipe/update-status/{id}": {
      "patch": {
        "tags": [
          "recipe-controller"
        ],
        "operationId": "updateStatus_3",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/price-categories/update/status/{id}": {
      "patch": {
        "tags": [
          "price-category-controller"
        ],
        "operationId": "updateStatus_4",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-insurance/update-status/{id}": {
      "patch": {
        "tags": [
          "patient-insurance-controller"
        ],
        "operationId": "updateStatus_5",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PatInsuranceUpdateStatusReq"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatientInsuranceReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-insurance-balance/update-status/{id}": {
      "patch": {
        "tags": [
          "patient-insurance-balance-controller"
        ],
        "operationId": "updateStatus_6",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/operation-types/update/status/{id}": {
      "patch": {
        "tags": [
          "operation-type-controller"
        ],
        "operationId": "updateStatus_7",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/operation-type-items/update/status/{id}": {
      "patch": {
        "tags": [
          "operation-type-item-controller"
        ],
        "operationId": "updateStatus_8",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/metal/update/status/{id}": {
      "patch": {
        "tags": [
          "metal-controller"
        ],
        "operationId": "updateStatus_9",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/medicine/update-status/{id}": {
      "patch": {
        "tags": [
          "medicine-controller"
        ],
        "operationId": "updateStatus_10",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/laboratory/technic/order/{id}/price": {
      "patch": {
        "tags": [
          "dental-order-controller"
        ],
        "operationId": "updateOrderStatus",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateOrderPrice"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/laboratory/order/status": {
      "patch": {
        "tags": [
          "dental-order-controller"
        ],
        "operationId": "updateOrderStatus_1",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateLabOrderStatus"
              }
            }
          },
          "required": true
        },
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/insurance-company/update/status/{id}": {
      "patch": {
        "tags": [
          "insurance-company-controller"
        ],
        "operationId": "updateStatus_11",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/garnitures/update/status/{id}": {
      "patch": {
        "tags": [
          "garniture-controller"
        ],
        "operationId": "updateStatus_12",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/color/update/status/{id}": {
      "patch": {
        "tags": [
          "color-controller"
        ],
        "operationId": "updateStatus_13",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/ceramic/update/status/{id}": {
      "patch": {
        "tags": [
          "ceramic-controller"
        ],
        "operationId": "updateStatus_14",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/blacklist-results/update/status/{id}": {
      "patch": {
        "tags": [
          "black-list-result"
        ],
        "operationId": "updateStatus_15",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/anamnesis-list/update/status/{id}": {
      "patch": {
        "tags": [
          "anamnesis-list-controller"
        ],
        "operationId": "updateStatus_16",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/anamnesis-categories/update/status/{id}": {
      "patch": {
        "tags": [
          "anamnesis-category-controller"
        ],
        "operationId": "updateStatus_17",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/workers-work-schedule/read": {
      "get": {
        "tags": [
          "workers-work-schedule-controller"
        ],
        "operationId": "read_1",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WorkersWorkScheduleResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse/read-warehouse": {
      "get": {
        "tags": [
          "warehouse-controller"
        ],
        "operationId": "read_2",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WarehouseReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-removal/read": {
      "get": {
        "tags": [
          "warehouse-removal-controller"
        ],
        "operationId": "read_3",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WarehouseRemovalReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-removal/info/{id}": {
      "get": {
        "tags": [
          "warehouse-removal-controller"
        ],
        "operationId": "info",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/WarehouseRemovalReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-removal-product/read": {
      "get": {
        "tags": [
          "warehouse-removal-product-controller"
        ],
        "operationId": "read_4",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WarehouseRemovalProductReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-removal-product/info/{groupId}": {
      "get": {
        "tags": [
          "warehouse-removal-product-controller"
        ],
        "operationId": "getWarehouseRemovalProductInfo",
        "parameters": [
          {
            "name": "groupId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/WarehouseRemovalCreateResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-receipts/info/{id}": {
      "get": {
        "tags": [
          "warehouse-receipts-controller"
        ],
        "operationId": "info_1",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/WarehouseReceiptsInfoResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-entry/read": {
      "get": {
        "tags": [
          "warehouse-entry-controller"
        ],
        "operationId": "read_5",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WarehouseEntryReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/warehouse-entry/info/{id}": {
      "get": {
        "tags": [
          "warehouse-entry-controller"
        ],
        "operationId": "info_2",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/WarehouseEntryResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/teeth/read": {
      "get": {
        "tags": [
          "teeth-controller"
        ],
        "operationId": "read_6",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TeethResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/teeth/read-all-by-tooth-no/{toothNo}": {
      "get": {
        "tags": [
          "teeth-controller"
        ],
        "operationId": "readAllByToothNo",
        "parameters": [
          {
            "name": "toothNo",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ExaminationResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/teeth-operation/read": {
      "get": {
        "tags": [
          "teeth-operation-controller"
        ],
        "operationId": "read_7",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TeethOperationResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/teeth-operation/read-by-id/{id}": {
      "get": {
        "tags": [
          "teeth-operation-controller"
        ],
        "operationId": "readById",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/TeethOperationResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/teeth-examination/read": {
      "get": {
        "tags": [
          "teeth-examination-controller"
        ],
        "operationId": "read_8",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TeethExaminationResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/technician/read": {
      "get": {
        "tags": [
          "technician-controller"
        ],
        "operationId": "read_9",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseTechnicianReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/technician/read-by-id/{id}": {
      "get": {
        "tags": [
          "technician-controller"
        ],
        "operationId": "readById_1",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/TechnicianReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/technician/export/excel": {
      "get": {
        "tags": [
          "technician-controller"
        ],
        "operationId": "exportToExcel",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/specialization/read": {
      "get": {
        "tags": [
          "specialization-category-controller"
        ],
        "operationId": "readSpecializationCategory",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/SpecializationCategoryResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/reservations/read": {
      "get": {
        "tags": [
          "reservation-controller"
        ],
        "operationId": "read_10",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseReservationReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/reservations/read-by-id/{id}": {
      "get": {
        "tags": [
          "reservation-controller"
        ],
        "operationId": "readById_2",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ReservationReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/reservations/export/excel": {
      "get": {
        "tags": [
          "reservation-controller"
        ],
        "operationId": "exportToExcel_1",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/recipe/search": {
      "get": {
        "tags": [
          "recipe-controller"
        ],
        "operationId": "search_25",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          },
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/SearchByNameAndStatus"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseRecipeReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/recipe/read": {
      "get": {
        "tags": [
          "recipe-controller"
        ],
        "operationId": "read_11",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseRecipeReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/recipe/read-list": {
      "get": {
        "tags": [
          "recipe-controller"
        ],
        "operationId": "read_12",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/RecipeReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/recipe/read-by-id": {
      "get": {
        "tags": [
          "recipe-controller"
        ],
        "operationId": "readById_3",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/RecipeReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/recipe/export/excel": {
      "get": {
        "tags": [
          "recipe-controller"
        ],
        "operationId": "exportToExcel_2",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/product/read": {
      "get": {
        "tags": [
          "product-controller"
        ],
        "operationId": "read_13",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ProductResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/product/read-by-id/{id}": {
      "get": {
        "tags": [
          "product-controller"
        ],
        "operationId": "readById_4",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ProductResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/product-category/read": {
      "get": {
        "tags": [
          "product-category-controller"
        ],
        "operationId": "read_14",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ProductCategoryReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/product-category/read-by-id/{id}": {
      "get": {
        "tags": [
          "product-category-controller"
        ],
        "operationId": "readById_5",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ProductCategoryReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/price-categories/search": {
      "get": {
        "tags": [
          "price-category-controller"
        ],
        "operationId": "search_26",
        "parameters": [
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PriceCategorySearchRequest"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PriceCategoryReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/price-categories/read": {
      "get": {
        "tags": [
          "price-category-controller"
        ],
        "operationId": "read_15",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PriceCategoryReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/price-categories/read-by-id/{id}": {
      "get": {
        "tags": [
          "price-category-controller"
        ],
        "operationId": "readById_6",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PriceCategoryReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/price-categories/export/excel": {
      "get": {
        "tags": [
          "price-category-controller"
        ],
        "operationId": "exportToExcel_3",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/permission/read": {
      "get": {
        "tags": [
          "permission-controller"
        ],
        "operationId": "read_16",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PermissionResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/permission/info/{id}": {
      "get": {
        "tags": [
          "permission-controller"
        ],
        "operationId": "info_3",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/InfoPermissionResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient/read": {
      "get": {
        "tags": [
          "patient-controller"
        ],
        "operationId": "read_17",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatientReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient/read-by-id/{id}": {
      "get": {
        "tags": [
          "patient-controller"
        ],
        "operationId": "readById_7",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PatientReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient/export/excel": {
      "get": {
        "tags": [
          "patient-controller"
        ],
        "operationId": "exportToExcel_4",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-xray/read": {
      "get": {
        "tags": [
          "patient-xray-controller"
        ],
        "operationId": "read_18",
        "parameters": [
          {
            "name": "patientId",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatXrayReadRes"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-xray/read-by-id/{id}": {
      "get": {
        "tags": [
          "patient-xray-controller"
        ],
        "operationId": "readById_8",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PatXrayReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-videos/read": {
      "get": {
        "tags": [
          "patient-videos-controller"
        ],
        "operationId": "read_19",
        "parameters": [
          {
            "name": "patientId",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatVideosReadRes"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-videos/read-by-id/{id}": {
      "get": {
        "tags": [
          "patient-videos-controller"
        ],
        "operationId": "readById_9",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PatVideosReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-recipes/read": {
      "get": {
        "tags": [
          "patient-recipe-controller"
        ],
        "operationId": "readAllById",
        "parameters": [
          {
            "name": "patientId",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatRecipeReadRes"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-recipes/read-by-id/{id}": {
      "get": {
        "tags": [
          "patient-recipe-controller"
        ],
        "operationId": "readById_10",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PatRecipeReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-plans/read": {
      "get": {
        "tags": [
          "patient-plans-controller"
        ],
        "operationId": "read_20",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatientPlansResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-plans/read-by-patient-plan-main/{id}": {
      "get": {
        "tags": [
          "patient-plans-controller"
        ],
        "operationId": "readByPatientPlanMainId",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatientPlansResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-plans-main/read": {
      "get": {
        "tags": [
          "patient-plans-main-controller"
        ],
        "operationId": "readMain",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatientPlansMainResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-plans-main/read/{patientId}": {
      "get": {
        "tags": [
          "patient-plans-main-controller"
        ],
        "operationId": "readMainByPatientId",
        "parameters": [
          {
            "name": "patientId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatientPlansMainResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-plans-main/read-patients-insurance/{patientInsuranceId}": {
      "get": {
        "tags": [
          "patient-plans-main-controller"
        ],
        "operationId": "readPatientsInsurance",
        "parameters": [
          {
            "name": "patientInsuranceId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-photos/read": {
      "get": {
        "tags": [
          "patient-photos-controller"
        ],
        "operationId": "read_21",
        "parameters": [
          {
            "name": "patientId",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatPhotosReadRes"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-photos/read-by-id/{id}": {
      "get": {
        "tags": [
          "patient-photos-controller"
        ],
        "operationId": "readById_11",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PatPhotosReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-insurance/read": {
      "get": {
        "tags": [
          "patient-insurance-controller"
        ],
        "operationId": "readAllById_1",
        "parameters": [
          {
            "name": "patientId",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatientInsuranceReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-insurance-balance/read": {
      "get": {
        "tags": [
          "patient-insurance-balance-controller"
        ],
        "operationId": "read_22",
        "parameters": [
          {
            "name": "patientInsuranceId",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatInsuranceBalanceReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-insurance-balance/read-by-id/{id}": {
      "get": {
        "tags": [
          "patient-insurance-balance-controller"
        ],
        "operationId": "readById_12",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PatInsuranceBalanceReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-examinations/read-examinations": {
      "get": {
        "tags": [
          "patient-examinations-controller"
        ],
        "operationId": "readExaminations",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ExaminationResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-blacklist/read": {
      "get": {
        "tags": [
          "patient-blacklist-controller"
        ],
        "operationId": "read_23",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponsePatBlacklistReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-blacklist/read-by-id/{id}": {
      "get": {
        "tags": [
          "patient-blacklist-controller"
        ],
        "operationId": "readById_13",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PatBlacklistReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-blacklist/export/excel": {
      "get": {
        "tags": [
          "patient-blacklist-controller"
        ],
        "operationId": "exportToExcel_5",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-anamnesis/read": {
      "get": {
        "tags": [
          "patient-anamnesis-controller"
        ],
        "operationId": "read_24",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatAnamnesisReadRes"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-anamnesis/read/{patientId}": {
      "get": {
        "tags": [
          "patient-anamnesis-controller"
        ],
        "operationId": "readAllById_2",
        "parameters": [
          {
            "name": "patientId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/PatAnamnesisReadRes"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/order-from-warehouse/read": {
      "get": {
        "tags": [
          "order-from-warehouse-controller"
        ],
        "operationId": "read_25",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/OrderFromWarehouseReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/order-from-warehouse/info/{id}": {
      "get": {
        "tags": [
          "order-from-warehouse-controller"
        ],
        "operationId": "info_4",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/OrderFromWarehouseResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/operation-types/search": {
      "get": {
        "tags": [
          "operation-type-controller"
        ],
        "operationId": "search_27",
        "parameters": [
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/OperationTypeSearchRequest"
            }
          },
          {
            "name": "criteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseOpTypeReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/operation-types/read": {
      "get": {
        "tags": [
          "operation-type-controller"
        ],
        "operationId": "read_26",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseOpTypeReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/operation-types/read-by-id/{id}": {
      "get": {
        "tags": [
          "operation-type-controller"
        ],
        "operationId": "readById_14",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/OpTypeReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/operation-types/export/excel": {
      "get": {
        "tags": [
          "operation-type-controller"
        ],
        "operationId": "exportToExcel_6",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/operation-type-items/search": {
      "get": {
        "tags": [
          "operation-type-item-controller"
        ],
        "operationId": "search_28",
        "parameters": [
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/OpTypeItemSearchRequest"
            }
          },
          {
            "name": "criteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseOpTypeItemReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/operation-type-items/read/{id}": {
      "get": {
        "tags": [
          "operation-type-item-controller"
        ],
        "operationId": "read_27",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          },
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseOpTypeItemReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/operation-type-items/read-by-id/{id}": {
      "get": {
        "tags": [
          "operation-type-item-controller"
        ],
        "operationId": "readById_15",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/OpTypeItemReadByIdResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/operation-type-items/export/excel": {
      "get": {
        "tags": [
          "operation-type-item-controller"
        ],
        "operationId": "exportToExcel_7",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/metal/search": {
      "get": {
        "tags": [
          "metal-controller"
        ],
        "operationId": "search_29",
        "parameters": [
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/SearchByNameAndStatus"
            }
          },
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseMetalReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/metal/read": {
      "get": {
        "tags": [
          "metal-controller"
        ],
        "operationId": "read_28",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseMetalReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/metal/read-list": {
      "get": {
        "tags": [
          "metal-controller"
        ],
        "operationId": "readList",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/MetalReadRes"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/metal/read-by-id/{id}": {
      "get": {
        "tags": [
          "metal-controller"
        ],
        "operationId": "readById_16",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/MetalReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/metal/export/excel": {
      "get": {
        "tags": [
          "metal-controller"
        ],
        "operationId": "exportToExcel_8",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/medicine/search": {
      "get": {
        "tags": [
          "medicine-controller"
        ],
        "operationId": "search_30",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          },
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/MedicineSearchRequest"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseMedicineReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/medicine/read": {
      "get": {
        "tags": [
          "medicine-controller"
        ],
        "operationId": "read_29",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          },
          {
            "name": "recipeId",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseMedicineReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/medicine/read-by-id": {
      "get": {
        "tags": [
          "medicine-controller"
        ],
        "operationId": "readById_17",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/MedicineReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/medicine/export/excel": {
      "get": {
        "tags": [
          "medicine-controller"
        ],
        "operationId": "exportToExcel_9",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/laboratory/technic/order/read": {
      "get": {
        "tags": [
          "dental-order-controller"
        ],
        "operationId": "getTechnicianOrdersByUUID",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TechnicianOrderResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/laboratory/order/read": {
      "get": {
        "tags": [
          "dental-order-controller"
        ],
        "operationId": "read_30",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TechnicianOrderResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/laboratory/order/read/dental-work-type": {
      "get": {
        "tags": [
          "dental-order-controller"
        ],
        "operationId": "readByDentalWorkType",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": [
                      "PROTEZ",
                      "QAPAQ"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/laboratory/order/read-by-id/{id}": {
      "get": {
        "tags": [
          "dental-order-controller"
        ],
        "operationId": "readById_18",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/TechnicianOrderResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/laboratory-payment/read": {
      "get": {
        "tags": [
          "dental-order-payment-controller"
        ],
        "operationId": "read_31",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TechnicianReportResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/insurance-company/search": {
      "get": {
        "tags": [
          "insurance-company-controller"
        ],
        "operationId": "search_31",
        "parameters": [
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/ICSearchRequest"
            }
          },
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseInsuranceReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/insurance-company/read": {
      "get": {
        "tags": [
          "insurance-company-controller"
        ],
        "operationId": "read_32",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseInsuranceReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/insurance-company/read-list": {
      "get": {
        "tags": [
          "insurance-company-controller"
        ],
        "operationId": "readList_1",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/InsuranceReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/insurance-company/read-by-id/{id}": {
      "get": {
        "tags": [
          "insurance-company-controller"
        ],
        "operationId": "read_33",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/InsuranceReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/insurance-company/export/excel": {
      "get": {
        "tags": [
          "insurance-company-controller"
        ],
        "operationId": "exportToExcel_10",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/implant/read": {
      "get": {
        "tags": [
          "implant-controller"
        ],
        "operationId": "read_34",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ImplantReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/implant-size/read": {
      "get": {
        "tags": [
          "implant-size-controller"
        ],
        "operationId": "read_35",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ImplantSizeResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/general-calendar/selecting-room-viewing-patient/{cabinetName}": {
      "get": {
        "tags": [
          "general-calendar-controller"
        ],
        "operationId": "selectingRoomViewingPatient",
        "parameters": [
          {
            "name": "cabinetName",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/SelectingDoctorViewingPatientResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/general-calendar/selecting-patient-to-read/{patientId}": {
      "get": {
        "tags": [
          "general-calendar-controller"
        ],
        "operationId": "selectingPatientToRead",
        "parameters": [
          {
            "name": "patientId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/SelectingPatientToReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/general-calendar/selecting-doctor-viewing-patient/{doctorId}": {
      "get": {
        "tags": [
          "general-calendar-controller"
        ],
        "operationId": "selectingDoctorViewingPatient",
        "parameters": [
          {
            "name": "doctorId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/SelectingDoctorViewingPatientResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/general-calendar/read-rooms": {
      "get": {
        "tags": [
          "general-calendar-controller"
        ],
        "operationId": "readRooms",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ReadRooms"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/general-calendar/read-doctors": {
      "get": {
        "tags": [
          "general-calendar-controller"
        ],
        "operationId": "readDoctors",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/GeneralCalendarResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/garnitures/search": {
      "get": {
        "tags": [
          "garniture-controller"
        ],
        "operationId": "search_32",
        "parameters": [
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/SearchByNameAndStatus"
            }
          },
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseGarnitureReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/garnitures/read": {
      "get": {
        "tags": [
          "garniture-controller"
        ],
        "operationId": "read_36",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseGarnitureReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/garnitures/read-list": {
      "get": {
        "tags": [
          "garniture-controller"
        ],
        "operationId": "readList_2",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/GarnitureReadRes"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/garnitures/read-by-id/{id}": {
      "get": {
        "tags": [
          "garniture-controller"
        ],
        "operationId": "readById_19",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/GarnitureReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/garnitures/export/excel": {
      "get": {
        "tags": [
          "garniture-controller"
        ],
        "operationId": "exportToExcel_11",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/examination/read": {
      "get": {
        "tags": [
          "examination-controller"
        ],
        "operationId": "read_37",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ExaminationResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/deletion-from-warehouse/read": {
      "get": {
        "tags": [
          "deletion-from-warehouse-controller"
        ],
        "operationId": "read_38",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/DeletionFromWarehouseResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/deletion-from-warehouse/info/{id}": {
      "get": {
        "tags": [
          "deletion-from-warehouse-controller"
        ],
        "operationId": "info_5",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/DeletionFromWarehouseReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/color/search": {
      "get": {
        "tags": [
          "color-controller"
        ],
        "operationId": "search_33",
        "parameters": [
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/SearchByNameAndStatus"
            }
          },
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseColorReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/color/read": {
      "get": {
        "tags": [
          "color-controller"
        ],
        "operationId": "read_39",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseColorReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/color/read-list": {
      "get": {
        "tags": [
          "color-controller"
        ],
        "operationId": "readList_3",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ColorReadRes"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/color/read-by-id/{id}": {
      "get": {
        "tags": [
          "color-controller"
        ],
        "operationId": "readById_20",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/ColorReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/color/export/excel": {
      "get": {
        "tags": [
          "color-controller"
        ],
        "operationId": "exportToExcel_12",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/ceramic/search": {
      "get": {
        "tags": [
          "ceramic-controller"
        ],
        "operationId": "search_34",
        "parameters": [
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/SearchByNameAndStatus"
            }
          },
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseCeramicReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/ceramic/read": {
      "get": {
        "tags": [
          "ceramic-controller"
        ],
        "operationId": "read_40",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseCeramicReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/ceramic/read-list": {
      "get": {
        "tags": [
          "ceramic-controller"
        ],
        "operationId": "readList_4",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/CeramicReadRes"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/ceramic/read-by-id/{id}": {
      "get": {
        "tags": [
          "ceramic-controller"
        ],
        "operationId": "readById_21",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/CeramicReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/ceramic/export/excel": {
      "get": {
        "tags": [
          "ceramic-controller"
        ],
        "operationId": "exportToExcel_13",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/cabinet/read": {
      "get": {
        "tags": [
          "cabinet-controller"
        ],
        "operationId": "read_41",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/CabinetResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/blacklist-results/search": {
      "get": {
        "tags": [
          "black-list-result"
        ],
        "operationId": "search_35",
        "parameters": [
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/BlacklistResultSearchReq"
            }
          },
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseBlacklistResultReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/blacklist-results/read": {
      "get": {
        "tags": [
          "black-list-result"
        ],
        "operationId": "read_42",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseBlacklistResultReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/blacklist-results/read-list": {
      "get": {
        "tags": [
          "black-list-result"
        ],
        "operationId": "readList_5",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/BlacklistResultReadRes"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/blacklist-results/read-by-id/{id}": {
      "get": {
        "tags": [
          "black-list-result"
        ],
        "operationId": "readById_22",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/BlacklistResultReadRes"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/blacklist-results/export/excel": {
      "get": {
        "tags": [
          "black-list-result"
        ],
        "operationId": "exportToExcel_14",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/appointment-type/read": {
      "get": {
        "tags": [
          "appointment-type-controller"
        ],
        "operationId": "read_43",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/AppointmentTypeResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/anamnesis-list/search": {
      "get": {
        "tags": [
          "anamnesis-list-controller"
        ],
        "operationId": "search_36",
        "parameters": [
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/AnemnesisListSearchReq"
            }
          },
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseAnamnesisList"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/anamnesis-list/read": {
      "get": {
        "tags": [
          "anamnesis-list-controller"
        ],
        "operationId": "read_44",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseAnemnesisListReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/anamnesis-list/read-list": {
      "get": {
        "tags": [
          "anamnesis-list-controller"
        ],
        "operationId": "readList_6",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/AnemnesisListReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/anamnesis-list/read-by-id/{id}": {
      "get": {
        "tags": [
          "anamnesis-list-controller"
        ],
        "operationId": "readById_23",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/AnemnesisListReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/anamnesis-list/export/excel": {
      "get": {
        "tags": [
          "anamnesis-list-controller"
        ],
        "operationId": "exportToExcel_15",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/anamnesis-categories/search": {
      "get": {
        "tags": [
          "anamnesis-category-controller"
        ],
        "operationId": "search_37",
        "parameters": [
          {
            "name": "request",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/AnemnesisCatSearchReq"
            }
          },
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseAnamnesisCatReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/anamnesis-categories/read": {
      "get": {
        "tags": [
          "anamnesis-category-controller"
        ],
        "operationId": "read_45",
        "parameters": [
          {
            "name": "pageCriteria",
            "in": "query",
            "required": true,
            "schema": {
              "$ref": "#/components/schemas/PageCriteria"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/PageResponseAnamnesisCatReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/anamnesis-categories/read-list": {
      "get": {
        "tags": [
          "anamnesis-category-controller"
        ],
        "operationId": "readList_7",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/AnamnesisCatReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/anamnesis-categories/read-by-id/{id}": {
      "get": {
        "tags": [
          "anamnesis-category-controller"
        ],
        "operationId": "readById_24",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/AnamnesisCatReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/anamnesis-categories/export/excel": {
      "get": {
        "tags": [
          "anamnesis-category-controller"
        ],
        "operationId": "exportToExcel_16",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/add-worker/read": {
      "get": {
        "tags": [
          "add-worker-controller"
        ],
        "operationId": "read_46",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/AddWorkerReadResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/add-worker/read-roles": {
      "get": {
        "tags": [
          "add-worker-controller"
        ],
        "operationId": "readStatus",
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/AddWorkerReadStatusResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/add-worker/info/{id}": {
      "get": {
        "tags": [
          "add-worker-controller"
        ],
        "operationId": "info_6",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "$ref": "#/components/schemas/AddWorkerReadResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/workers-work-schedule/delete/{id}": {
      "delete": {
        "tags": [
          "workers-work-schedule-controller"
        ],
        "operationId": "delete_1",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/warehouse-removal-product/delete/group-id/{groupId}": {
      "delete": {
        "tags": [
          "warehouse-removal-product-controller"
        ],
        "operationId": "deleteWarehouseRemovalIdBasedOnWarehouseRemovalProduct",
        "parameters": [
          {
            "name": "groupId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/warehouse-entry/delete/{id}": {
      "delete": {
        "tags": [
          "warehouse-entry-controller"
        ],
        "operationId": "delete_2",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/warehouse-entry/delete-entry-product/warehouse-entry/{id}/warehouse-entry-product/{productId}": {
      "delete": {
        "tags": [
          "warehouse-entry-controller"
        ],
        "operationId": "deleteEntryProduct",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          },
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/teeth/delete/{id}": {
      "delete": {
        "tags": [
          "teeth-controller"
        ],
        "operationId": "delete_3",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/teeth-operation/delete/{id}": {
      "delete": {
        "tags": [
          "teeth-operation-controller"
        ],
        "operationId": "delete_4",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/teeth-examination/delete/{id}": {
      "delete": {
        "tags": [
          "teeth-examination-controller"
        ],
        "operationId": "delete_5",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/technician/delete/{id}": {
      "delete": {
        "tags": [
          "technician-controller"
        ],
        "operationId": "delete_6",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/specialization/delete/{id}": {
      "delete": {
        "tags": [
          "specialization-category-controller"
        ],
        "operationId": "deleteSpecializationCategory",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/reservations/delete/{id}": {
      "delete": {
        "tags": [
          "reservation-controller"
        ],
        "operationId": "delete_7",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/recipe/delete/{id}": {
      "delete": {
        "tags": [
          "recipe-controller"
        ],
        "operationId": "delete_8",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/product/delete/{id}": {
      "delete": {
        "tags": [
          "product-controller"
        ],
        "operationId": "delete_9",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/product-category/delete/{id}": {
      "delete": {
        "tags": [
          "product-category-controller"
        ],
        "operationId": "delete_10",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/price-categories/delete/{id}": {
      "delete": {
        "tags": [
          "price-category-controller"
        ],
        "operationId": "delete_11",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/permission/delete/{id}": {
      "delete": {
        "tags": [
          "permission-controller"
        ],
        "operationId": "delete_12",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient/delete/{id}": {
      "delete": {
        "tags": [
          "patient-controller"
        ],
        "operationId": "delete_13",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/patient-xray/delete/{id}": {
      "delete": {
        "tags": [
          "patient-xray-controller"
        ],
        "operationId": "delete_14",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-videos/delete/{id}": {
      "delete": {
        "tags": [
          "patient-videos-controller"
        ],
        "operationId": "delete_15",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-recipes/delete/{id}": {
      "delete": {
        "tags": [
          "patient-recipe-controller"
        ],
        "operationId": "delete_16",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-plans-main/delete/{id}": {
      "delete": {
        "tags": [
          "patient-plans-main-controller"
        ],
        "operationId": "deleteMain",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-photos/delete/{id}": {
      "delete": {
        "tags": [
          "patient-photos-controller"
        ],
        "operationId": "delete_17",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-insurance/delete/{id}": {
      "delete": {
        "tags": [
          "patient-insurance-controller"
        ],
        "operationId": "delete_18",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-insurance-balance/delete/{id}": {
      "delete": {
        "tags": [
          "patient-insurance-balance-controller"
        ],
        "operationId": "delete_19",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-examinations/delete/{id}": {
      "delete": {
        "tags": [
          "patient-examinations-controller"
        ],
        "operationId": "delete_20",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-blacklist/delete/{id}": {
      "delete": {
        "tags": [
          "patient-blacklist-controller"
        ],
        "operationId": "delete_21",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/patient-anamnesis/delete/{id}": {
      "delete": {
        "tags": [
          "patient-anamnesis-controller"
        ],
        "operationId": "delete_22",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/order-from-warehouse/delete/{id}": {
      "delete": {
        "tags": [
          "order-from-warehouse-controller"
        ],
        "operationId": "delete_23",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/order-from-warehouse/delete-order-from-warehouse-product/order-from-warehouse/{id}/order-from-warehouse-product/{productId}": {
      "delete": {
        "tags": [
          "order-from-warehouse-controller"
        ],
        "operationId": "deleteOrderFromWarehouseProduct",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          },
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/operation-types/delete/{id}": {
      "delete": {
        "tags": [
          "operation-type-controller"
        ],
        "operationId": "delete_24",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/operation-type-items/delete/{id}": {
      "delete": {
        "tags": [
          "operation-type-item-controller"
        ],
        "operationId": "delete_25",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/metal/delete/{id}": {
      "delete": {
        "tags": [
          "metal-controller"
        ],
        "operationId": "delete_26",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/medicine/delete/{id}": {
      "delete": {
        "tags": [
          "medicine-controller"
        ],
        "operationId": "delete_27",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/laboratory/order/delete/{id}": {
      "delete": {
        "tags": [
          "dental-order-controller"
        ],
        "operationId": "delete_28",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/insurance-company/delete/{id}": {
      "delete": {
        "tags": [
          "insurance-company-controller"
        ],
        "operationId": "delete_29",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/implant/delete/{id}": {
      "delete": {
        "tags": [
          "implant-controller"
        ],
        "operationId": "delete_30",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/implant-size/delete/{id}": {
      "delete": {
        "tags": [
          "implant-size-controller"
        ],
        "operationId": "delete_31",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/general-calendar/delete-appointment/{id}": {
      "delete": {
        "tags": [
          "general-calendar-controller"
        ],
        "operationId": "deleteAppointment",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK",
            "content": {
              "*/*": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/garnitures/delete/{id}": {
      "delete": {
        "tags": [
          "garniture-controller"
        ],
        "operationId": "delete_32",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/examination/delete/{id}": {
      "delete": {
        "tags": [
          "examination-controller"
        ],
        "operationId": "delete_33",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/deletion-from-warehouse/delete/{id}": {
      "delete": {
        "tags": [
          "deletion-from-warehouse-controller"
        ],
        "operationId": "delete_34",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/color/delete/{id}": {
      "delete": {
        "tags": [
          "color-controller"
        ],
        "operationId": "delete_35",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/ceramic/delete/{id}": {
      "delete": {
        "tags": [
          "ceramic-controller"
        ],
        "operationId": "delete_36",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/cabinet/delete/{id}": {
      "delete": {
        "tags": [
          "cabinet-controller"
        ],
        "operationId": "delete_37",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/blacklist-results/delete/{id}": {
      "delete": {
        "tags": [
          "black-list-result"
        ],
        "operationId": "delete_38",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/appointment-type/delete/{id}": {
      "delete": {
        "tags": [
          "appointment-type-controller"
        ],
        "operationId": "delete_39",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/anamnesis-list/delete/{id}": {
      "delete": {
        "tags": [
          "anamnesis-list-controller"
        ],
        "operationId": "delete_40",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/anamnesis-categories/delete/{id}": {
      "delete": {
        "tags": [
          "anamnesis-category-controller"
        ],
        "operationId": "delete_41",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int64"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/v1/add-worker/delete/{id}": {
      "delete": {
        "tags": [
          "add-worker-controller"
        ],
        "operationId": "delete_42",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable Entity",
            "content": {
              "*/*": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "200": {
            "description": "OK"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "LocalTime": {
        "type": "object",
        "properties": {
          "hour": {
            "type": "integer",
            "format": "int32"
          },
          "minute": {
            "type": "integer",
            "format": "int32"
          },
          "second": {
            "type": "integer",
            "format": "int32"
          },
          "nano": {
            "type": "integer",
            "format": "int32"
          }
        }
      },
      "WorkersWorkScheduleUpdateDTO": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "weekDay": {
            "type": "string",
            "enum": [
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY"
            ]
          },
          "cabinetName": {
            "type": "string"
          },
          "startTime": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "finishTime": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "WarehouseRemovalProductRequest": {
        "type": "object",
        "properties": {
          "warehouseRemovalProductId": {
            "type": "integer",
            "format": "int64"
          },
          "orderFromWarehouseProductId": {
            "type": "integer",
            "format": "int64"
          },
          "currentExpenses": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "WarehouseRemovalProductUpdateRequest": {
        "type": "object",
        "properties": {
          "groupId": {
            "type": "string"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "warehouseRemovalId": {
            "type": "integer",
            "format": "int64"
          },
          "requests": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/WarehouseRemovalProductRequest"
            }
          },
          "description": {
            "type": "string"
          }
        }
      },
      "OutOfTheWarehouseDto": {
        "type": "object",
        "properties": {
          "categoryName": {
            "type": "string"
          },
          "productName": {
            "type": "string"
          },
          "productDescription": {
            "type": "string"
          },
          "sendQuantity": {
            "type": "integer",
            "format": "int64"
          },
          "orderQuantity": {
            "type": "integer",
            "format": "int64"
          },
          "remainingQuantity": {
            "type": "integer",
            "format": "int64"
          },
          "currentAmount": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "WarehouseRemovalCreateResponse": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "groupId": {
            "type": "string"
          },
          "outOfTheWarehouseDtos": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OutOfTheWarehouseDto"
            }
          },
          "description": {
            "type": "string"
          },
          "number": {
            "type": "integer",
            "format": "int32"
          },
          "status": {
            "type": "string",
            "enum": [
              "WAITING",
              "CONFIRMED"
            ]
          }
        }
      },
      "WarehouseReceiptsStatusUpdateRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "status": {
            "type": "string",
            "enum": [
              "WAITING",
              "CONFIRMED"
            ]
          }
        }
      },
      "WarehouseReceiptsResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "cabinetName": {
            "type": "string"
          },
          "personWhoPlacedOrder": {
            "type": "string"
          },
          "orderQuantity": {
            "type": "integer",
            "format": "int64"
          },
          "sendQuantity": {
            "type": "integer",
            "format": "int64"
          },
          "pendingStatus": {
            "type": "string",
            "enum": [
              "WAITING",
              "CONFIRMED"
            ]
          }
        }
      },
      "WarehouseEntryProductUpdateRequest": {
        "type": "object",
        "properties": {
          "warehouseEntryProductId": {
            "type": "integer",
            "format": "int64"
          },
          "categoryId": {
            "type": "integer",
            "format": "int64"
          },
          "productId": {
            "type": "integer",
            "format": "int64"
          },
          "quantity": {
            "type": "integer",
            "format": "int64"
          },
          "price": {
            "type": "number"
          }
        }
      },
      "WarehouseEntryUpdateRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "warehouseEntryProductUpdateRequests": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/WarehouseEntryProductUpdateRequest"
            }
          },
          "description": {
            "type": "string"
          }
        }
      },
      "WarehouseEntryCreateResponse": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "warehouseEntryProducts": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/WarehouseEntryProductResponse"
            }
          },
          "description": {
            "type": "string"
          },
          "sumPrice": {
            "type": "number"
          }
        }
      },
      "WarehouseEntryProductResponse": {
        "type": "object",
        "properties": {
          "categoryName": {
            "type": "string"
          },
          "productName": {
            "type": "string"
          },
          "productTitle": {
            "type": "string"
          },
          "quantity": {
            "type": "integer",
            "format": "int64"
          },
          "price": {
            "type": "number"
          }
        }
      },
      "UpdateTeethRequest": {
        "required": [
          "id"
        ],
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "toothNo": {
            "type": "integer",
            "format": "int64"
          },
          "toothType": {
            "type": "string",
            "enum": [
              "CHILD",
              "ADULT"
            ]
          },
          "toothLocation": {
            "type": "string",
            "enum": [
              "TOP_LEFT",
              "TOP_RIGHT",
              "BOTTOM_RIGHT",
              "BOTTOM_LEFT",
              "MEDIUM"
            ]
          }
        }
      },
      "TeethUpdateResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "toothNo": {
            "type": "integer",
            "format": "int64"
          },
          "toothType": {
            "type": "string",
            "enum": [
              "CHILD",
              "ADULT"
            ]
          },
          "toothLocation": {
            "type": "string",
            "enum": [
              "TOP_LEFT",
              "TOP_RIGHT",
              "BOTTOM_RIGHT",
              "BOTTOM_LEFT",
              "MEDIUM"
            ]
          }
        }
      },
      "OpTypeAndItemRequest": {
        "type": "object",
        "properties": {
          "operationName": {
            "type": "string"
          }
        }
      },
      "UpdateTeethOperationRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "teethId": {
            "type": "integer",
            "format": "int64"
          },
          "opTypeAndItemRequests": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OpTypeAndItemRequest"
            }
          }
        }
      },
      "TeethOperationResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "operationName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "TeethExaminationUpdateRequest": {
        "required": [
          "id"
        ],
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "teethId": {
            "type": "integer",
            "format": "int64"
          },
          "examinationIds": {
            "type": "array",
            "items": {
              "type": "integer",
              "format": "int64"
            }
          }
        }
      },
      "Examination": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "typeName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "Teeth": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "toothNo": {
            "type": "integer",
            "format": "int64"
          },
          "toothType": {
            "type": "string",
            "enum": [
              "CHILD",
              "ADULT"
            ]
          },
          "toothLocation": {
            "type": "string",
            "enum": [
              "TOP_LEFT",
              "TOP_RIGHT",
              "BOTTOM_RIGHT",
              "BOTTOM_LEFT",
              "MEDIUM"
            ]
          }
        }
      },
      "TeethExaminationResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "teeth": {
            "$ref": "#/components/schemas/Teeth"
          },
          "examination": {
            "$ref": "#/components/schemas/Examination"
          }
        }
      },
      "TechnicianUpdateRequest": {
        "type": "object",
        "properties": {
          "password": {
            "pattern": "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!_]).{8,}$",
            "type": "string"
          },
          "name": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "surname": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "finCode": {
            "pattern": "^[A-Z0-9]{7}$",
            "type": "string"
          },
          "dateOfBirth": {
            "type": "string",
            "format": "date"
          },
          "phone": {
            "pattern": "\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}",
            "type": "string"
          },
          "phone2": {
            "pattern": "\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}",
            "type": "string"
          },
          "genderStatus": {
            "type": "string",
            "enum": [
              "MAN",
              "WOMAN"
            ]
          },
          "patronymic": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "email": {
            "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "homePhone": {
            "type": "string"
          }
        }
      },
      "SpecializationCategoryUpdateRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          }
        }
      },
      "SpecializationCategoryResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "name": {
            "type": "string"
          }
        }
      },
      "ReservationUpdateRequest": {
        "type": "object",
        "properties": {
          "startDate": {
            "type": "string",
            "format": "date"
          },
          "endDate": {
            "type": "string",
            "format": "date"
          },
          "startTime": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "endTime": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "weekDays": {
            "uniqueItems": true,
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY"
              ]
            }
          },
          "doctorId": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "ReservationUpdateResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "startDate": {
            "type": "string",
            "format": "date"
          },
          "endDate": {
            "type": "string",
            "format": "date"
          },
          "startTime": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "endTime": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "doctorId": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "RecipeUpdateRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      },
      "ProductUpdateRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "productName": {
            "type": "string"
          },
          "productNo": {
            "type": "integer",
            "format": "int64"
          },
          "productTitle": {
            "type": "string"
          }
        }
      },
      "ProductResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "categoryId": {
            "type": "integer",
            "format": "int64"
          },
          "categoryName": {
            "type": "string"
          },
          "productName": {
            "type": "string"
          },
          "productNo": {
            "type": "integer",
            "format": "int64"
          },
          "productTitle": {
            "type": "string"
          }
        }
      },
      "ProductUpdatedStatusRequest": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "integer",
            "format": "int64"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "ProductReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "productName": {
            "type": "string"
          },
          "productNo": {
            "type": "integer",
            "format": "int64"
          },
          "productTitle": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "ProductCategoryUpdateRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "categoryName": {
            "type": "string"
          }
        }
      },
      "ProductCategoryResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "categoryName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "ProductCategoryStatusUpdatedRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PriceCategoryUpdateRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      },
      "ModulePermissionUpdateRequest": {
        "type": "object",
        "properties": {
          "modulePermissionId": {
            "type": "integer",
            "format": "int64"
          },
          "moduleUrl": {
            "type": "string"
          },
          "actions": {
            "uniqueItems": true,
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "READ",
                "CREATE",
                "UPDATE",
                "DELETE",
                "STATUS",
                "SORT"
              ]
            }
          }
        }
      },
      "PermissionUpdateRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "permissionName": {
            "type": "string"
          },
          "permissions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ModulePermissionUpdateRequest"
            }
          }
        }
      },
      "PermissionCreateResponse": {
        "type": "object",
        "properties": {
          "permissionName": {
            "type": "string"
          },
          "modulePermissions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ModulePermissionUpdateRequest"
            }
          }
        }
      },
      "PermissionStatusUpdatedRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PermissionResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "permissionName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PatientUpdateRequest": {
        "type": "object",
        "properties": {
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "surname": {
            "type": "string"
          },
          "patronymic": {
            "type": "string"
          },
          "finCode": {
            "type": "string"
          },
          "genderStatus": {
            "type": "string",
            "enum": [
              "MAN",
              "WOMAN"
            ]
          },
          "dateOfBirth": {
            "type": "string",
            "format": "date"
          },
          "priceCategoryName": {
            "type": "string"
          },
          "specializationName": {
            "type": "string"
          },
          "doctorId": {
            "type": "string"
          },
          "phone": {
            "type": "string"
          },
          "workPhone": {
            "type": "string"
          },
          "homePhone": {
            "type": "string"
          },
          "homeAddress": {
            "type": "string"
          },
          "workAddress": {
            "type": "string"
          },
          "email": {
            "type": "string"
          }
        }
      },
      "PatientUpdateResponse": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "surname": {
            "type": "string"
          },
          "patronymic": {
            "type": "string"
          },
          "finCode": {
            "type": "string"
          },
          "genderStatus": {
            "type": "string",
            "enum": [
              "MAN",
              "WOMAN"
            ]
          },
          "dateOfBirth": {
            "type": "string",
            "format": "date"
          },
          "priceCategoryName": {
            "type": "string"
          },
          "specializationCategoryName": {
            "type": "string"
          },
          "phone": {
            "type": "string"
          },
          "workPhone": {
            "type": "string"
          },
          "homePhone": {
            "type": "string"
          },
          "homeAddress": {
            "type": "string"
          },
          "workAddress": {
            "type": "string"
          },
          "email": {
            "type": "string"
          }
        }
      },
      "PatXrayUpdateReq": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "description": {
            "type": "string"
          }
        }
      },
      "PatVideosUpdateReq": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "description": {
            "type": "string"
          }
        }
      },
      "PatRecipeUpdateReq": {
        "required": [
          "date",
          "recipeId"
        ],
        "type": "object",
        "properties": {
          "recipeId": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          }
        }
      },
      "PatientPlanUpdateRequest": {
        "type": "object",
        "properties": {
          "patientPlanMainId": {
            "type": "string",
            "format": "uuid"
          },
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "toothId": {
            "type": "integer",
            "format": "int64"
          },
          "categoryId": {
            "type": "integer",
            "format": "int64"
          },
          "operationId": {
            "type": "integer",
            "format": "int64"
          },
          "partOfTeethIds": {
            "type": "array",
            "items": {
              "type": "integer",
              "format": "int64"
            }
          }
        }
      },
      "OperationOfCategoryDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "categoryName": {
            "type": "string"
          },
          "categoryCode": {
            "type": "string"
          }
        }
      },
      "PatientPlanPartOfToothDetailDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "partOfToothId": {
            "type": "integer",
            "format": "int64"
          },
          "operationName": {
            "type": "string"
          },
          "price": {
            "type": "number"
          }
        }
      },
      "PatientPlansDto": {
        "type": "object",
        "properties": {
          "toothNo": {
            "type": "integer",
            "format": "int64"
          },
          "operationOfCategoryDto": {
            "$ref": "#/components/schemas/OperationOfCategoryDto"
          },
          "isSave": {
            "type": "boolean"
          },
          "partOfTeethIds": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PatientPlanPartOfToothDetailDto"
            }
          }
        }
      },
      "PatientPlansResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "patientPlansDto": {
            "$ref": "#/components/schemas/PatientPlansDto"
          }
        }
      },
      "PatientPlansMainUpdateRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "planName": {
            "type": "string"
          },
          "key": {
            "type": "string"
          }
        }
      },
      "PatientPlansMainResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "planName": {
            "type": "string"
          },
          "key": {
            "type": "string"
          },
          "insuranceId": {
            "type": "integer",
            "format": "int64"
          },
          "isSave": {
            "type": "boolean"
          }
        }
      },
      "PatPhotosUpdateReq": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "description": {
            "type": "string"
          }
        }
      },
      "PatInsuranceUpdateReq": {
        "type": "object",
        "properties": {
          "insuranceCompanyId": {
            "type": "integer",
            "format": "int64"
          },
          "policyNumber": {
            "type": "string"
          },
          "expirationDate": {
            "type": "string",
            "format": "date"
          },
          "deductibleAmount": {
            "type": "number"
          },
          "annualMaxAmount": {
            "type": "number"
          },
          "description": {
            "type": "string"
          }
        }
      },
      "PatInsuranceBalanceUpdateReq": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "amount": {
            "type": "number"
          },
          "patientInsuranceId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "PatientExaminationsUpdateRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "toothNumber": {
            "type": "integer",
            "format": "int64"
          },
          "partOfTeethIds": {
            "type": "array",
            "items": {
              "type": "integer",
              "format": "int64"
            }
          },
          "examinationId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "PatientExaminationsCreateResponse": {
        "type": "object",
        "properties": {
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "toothNo": {
            "type": "array",
            "items": {
              "type": "integer",
              "format": "int64"
            }
          },
          "diagnosis": {
            "type": "string"
          },
          "doctorId": {
            "type": "string"
          }
        }
      },
      "PatAnamnesisUpdateReq": {
        "type": "object",
        "properties": {
          "anamnesisName": {
            "type": "string"
          },
          "anamnesisCategoryName": {
            "type": "string"
          }
        }
      },
      "OrderFromWarehouseProductUpdateRequest": {
        "type": "object",
        "properties": {
          "orderFromWarehouseProductId": {
            "type": "integer",
            "format": "int64"
          },
          "warehouseEntryId": {
            "type": "integer",
            "format": "int64"
          },
          "warehouseEntryProductId": {
            "type": "integer",
            "format": "int64"
          },
          "categoryId": {
            "type": "integer",
            "format": "int64"
          },
          "productId": {
            "type": "integer",
            "format": "int64"
          },
          "quantity": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "OrderFromWarehouseUpdateRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "cabinetName": {
            "type": "string"
          },
          "orderFromWarehouseProductUpdateRequests": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OrderFromWarehouseProductUpdateRequest"
            }
          },
          "description": {
            "type": "string"
          }
        }
      },
      "OrderFromWarehouseProductResponse": {
        "type": "object",
        "properties": {
          "categoryName": {
            "type": "string"
          },
          "productName": {
            "type": "string"
          },
          "productTitle": {
            "type": "string"
          },
          "quantity": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "OrderFromWarehouseResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "cabinetName": {
            "type": "string"
          },
          "orderFromWarehouseProductResponses": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OrderFromWarehouseProductResponse"
            }
          },
          "description": {
            "type": "string"
          },
          "personWhoPlacedOrder": {
            "type": "string"
          },
          "number": {
            "type": "integer",
            "format": "int32"
          },
          "quantity": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "OpTypeInsuranceRequest": {
        "type": "object",
        "properties": {
          "deductiblePercentage": {
            "type": "number"
          },
          "insuranceCompanyId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "OpTypeUpdateRequest": {
        "type": "object",
        "properties": {
          "categoryName": {
            "type": "string"
          },
          "categoryCode": {
            "type": "string"
          },
          "colorSelection": {
            "type": "boolean"
          },
          "implantSelection": {
            "type": "boolean"
          },
          "insurances": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OpTypeInsuranceRequest"
            }
          }
        }
      },
      "OpTypeItemInsuranceUpdateRequest": {
        "type": "object",
        "properties": {
          "insuranceCompanyId": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "amount": {
            "type": "number"
          },
          "specificCode": {
            "type": "string"
          }
        }
      },
      "OpTypeItemUpdateRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "operationName": {
            "type": "string"
          },
          "operationCode": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "price": {
            "type": "number"
          },
          "insurances": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OpTypeItemInsuranceUpdateRequest"
            }
          }
        }
      },
      "UpdateMetalReq": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      },
      "MedicineUpdateRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          }
        }
      },
      "DentalOrderToothDetailIds": {
        "type": "object",
        "properties": {
          "colorId": {
            "type": "integer",
            "format": "int64"
          },
          "metalId": {
            "type": "integer",
            "format": "int64"
          },
          "ceramicId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "OrderDentureInfo": {
        "type": "object",
        "properties": {
          "color": {
            "type": "string"
          },
          "garniture": {
            "type": "string"
          }
        }
      },
      "UpdateTechnicianOrderReq": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "checkDate": {
            "type": "string",
            "format": "date"
          },
          "deliveryDate": {
            "type": "string",
            "format": "date"
          },
          "description": {
            "type": "string"
          },
          "orderType": {
            "type": "string"
          },
          "orderDentureInfo": {
            "$ref": "#/components/schemas/OrderDentureInfo"
          },
          "toothDetailIds": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/DentalOrderToothDetailIds"
            }
          },
          "teethList": {
            "type": "array",
            "items": {
              "type": "integer",
              "format": "int64"
            }
          },
          "doctorId": {
            "type": "string"
          },
          "technicianId": {
            "type": "string",
            "format": "uuid"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "files": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "deleteFiles": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "UpdateICRequest": {
        "type": "object",
        "properties": {
          "companyName": {
            "type": "string"
          },
          "deductibleAmount": {
            "type": "number"
          }
        }
      },
      "ImplantUpdateRequest": {
        "type": "object",
        "properties": {
          "implantId": {
            "type": "integer",
            "format": "int64"
          },
          "implantBrandName": {
            "type": "string"
          }
        }
      },
      "ImplantResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "implantBrandName": {
            "type": "string"
          }
        }
      },
      "ImplantStatusUpdateRequest": {
        "type": "object",
        "properties": {
          "implantId": {
            "type": "integer",
            "format": "int64"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "ImplantSizeUpdateRequest": {
        "type": "object",
        "properties": {
          "implantSizeId": {
            "type": "integer",
            "format": "int64"
          },
          "diameter": {
            "type": "number",
            "format": "double"
          },
          "length": {
            "type": "number",
            "format": "double"
          }
        }
      },
      "ImplantSizeResponse": {
        "type": "object",
        "properties": {
          "diameter": {
            "type": "number",
            "format": "double"
          },
          "length": {
            "type": "number",
            "format": "double"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "ImplantSizeStatusUpdateRequest": {
        "type": "object",
        "properties": {
          "implantSizeId": {
            "type": "integer",
            "format": "int64"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "UpdateAppointmentRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "doctorId": {
            "type": "string"
          },
          "cabinetName": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "appointment": {
            "type": "string",
            "enum": [
              "MEETING",
              "CAME",
              "CANCELED"
            ]
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "period": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "AppointmentTypeResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "appointmentTypeName": {
            "type": "string"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "NewAppointmentResponse": {
        "type": "object",
        "properties": {
          "doctorName": {
            "type": "string"
          },
          "cabinetName": {
            "type": "string"
          },
          "patientName": {
            "type": "string"
          },
          "appointment": {
            "type": "string",
            "enum": [
              "MEETING",
              "CAME",
              "CANCELED"
            ]
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "appointmentTypeResponses": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AppointmentTypeResponse"
            }
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "period": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "UpdateGarnitureReq": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      },
      "ExaminationUpdateRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "typeName": {
            "type": "string"
          }
        }
      },
      "ExaminationResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "typeName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "ExaminationRequest": {
        "type": "object",
        "properties": {
          "typeName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "DeletionFromWarehouseProductRequest": {
        "type": "object",
        "properties": {
          "deletionFromWarehouseProductId": {
            "type": "integer",
            "format": "int64"
          },
          "warehouseEntryId": {
            "type": "integer",
            "format": "int64"
          },
          "warehouseEntryProductId": {
            "type": "integer",
            "format": "int64"
          },
          "productId": {
            "type": "integer",
            "format": "int64"
          },
          "categoryId": {
            "type": "integer",
            "format": "int64"
          },
          "quantity": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "DeletionFromWarehouseUpdateRequest": {
        "type": "object",
        "properties": {
          "deletionFromWarehouseId": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "description": {
            "type": "string"
          },
          "deletionFromWarehouseProductRequests": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/DeletionFromWarehouseProductRequest"
            }
          }
        }
      },
      "DeletionFromWarehouseProductResponse": {
        "type": "object",
        "properties": {
          "warehouseEntryProductId": {
            "type": "integer",
            "format": "int64"
          },
          "warehouseEntryId": {
            "type": "integer",
            "format": "int64"
          },
          "categoryId": {
            "type": "integer",
            "format": "int64"
          },
          "categoryName": {
            "type": "string"
          },
          "productName": {
            "type": "string"
          },
          "productTitle": {
            "type": "string"
          },
          "productId": {
            "type": "integer",
            "format": "int64"
          },
          "quantity": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "DeletionFromWarehouseReadResponse": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "deletionFromWarehouseProductResponses": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/DeletionFromWarehouseProductResponse"
            }
          },
          "number": {
            "type": "integer",
            "format": "int32"
          },
          "description": {
            "type": "string"
          }
        }
      },
      "UpdateColorReq": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      },
      "UpdateCeramicReq": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      },
      "CabinetUpdateRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "cabinetName": {
            "type": "string"
          }
        }
      },
      "CabinetResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "cabinetName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "CabinetStatusUpdatedRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "CabinetStatusUpdatedResponse": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "UpdateBlacklistResultReq": {
        "required": [
          "statusName"
        ],
        "type": "object",
        "properties": {
          "statusName": {
            "type": "string"
          }
        }
      },
      "AppointmentTypeUpdateRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "appointmentTypeName": {
            "type": "string"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "UpdateAnemnesisListReq": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      },
      "UpdateAnemnesisCatReq": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      },
      "AddWorkerUpdateRequest": {
        "required": [
          "id"
        ],
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "pattern": "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!_]).{8,}$",
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "surname": {
            "type": "string"
          },
          "patronymic": {
            "type": "string"
          },
          "finCode": {
            "pattern": "^$|^[A-Z0-9]{7}$",
            "type": "string"
          },
          "colorCode": {
            "type": "string"
          },
          "genderStatus": {
            "type": "string",
            "enum": [
              "MAN",
              "WOMAN"
            ]
          },
          "dateOfBirth": {
            "type": "string",
            "format": "date"
          },
          "degree": {
            "type": "string"
          },
          "phone": {
            "pattern": "\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}",
            "type": "string"
          },
          "phone2": {
            "pattern": "\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}",
            "type": "string"
          },
          "phone3": {
            "pattern": "\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}",
            "type": "string"
          },
          "homePhone": {
            "pattern": "\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}",
            "type": "string"
          },
          "email": {
            "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "experience": {
            "type": "integer",
            "format": "int32"
          },
          "permissions": {
            "uniqueItems": true,
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "AddWorkerUpdateResponse": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "surname": {
            "type": "string"
          },
          "patronymic": {
            "type": "string"
          },
          "finCode": {
            "type": "string"
          },
          "colorCode": {
            "type": "string"
          },
          "enabled": {
            "type": "boolean"
          },
          "genderStatus": {
            "type": "string",
            "enum": [
              "MAN",
              "WOMAN"
            ]
          },
          "dateOfBirth": {
            "type": "string",
            "format": "date"
          },
          "degree": {
            "type": "string"
          },
          "phone": {
            "type": "string"
          },
          "phone2": {
            "type": "string"
          },
          "homePhone": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "experience": {
            "type": "integer",
            "format": "int32"
          },
          "permissions": {
            "uniqueItems": true,
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "WorkersWorkScheduleSearchRequest": {
        "type": "object",
        "properties": {
          "weekDay": {
            "type": "string",
            "enum": [
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY"
            ]
          }
        }
      },
      "WorkersWorkScheduleResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "weekDay": {
            "type": "string",
            "enum": [
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY"
            ]
          },
          "cabinetName": {
            "type": "string"
          },
          "userId": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string"
          },
          "surname": {
            "type": "string"
          },
          "startTime": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "finishTime": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "WorkersWorkScheduleRequest": {
        "required": [
          "cabinetName",
          "userId",
          "weekDay"
        ],
        "type": "object",
        "properties": {
          "weekDay": {
            "type": "string",
            "enum": [
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY"
            ]
          },
          "cabinetName": {
            "type": "string"
          },
          "userId": {
            "type": "string"
          },
          "startTime": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "finishTime": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "WarehouseSearchRequest": {
        "type": "object",
        "properties": {
          "categoryId": {
            "type": "integer",
            "format": "int64"
          },
          "productName": {
            "type": "string"
          },
          "productNo": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "WarehouseReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "categoryName": {
            "type": "string"
          },
          "productName": {
            "type": "string"
          },
          "productNo": {
            "type": "integer",
            "format": "int64"
          },
          "sumQuantity": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "WarehouseRemovalProductSearchRequest": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "WarehouseRemovalProductResponse": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "categoryId": {
            "type": "integer",
            "format": "int64"
          },
          "productId": {
            "type": "integer",
            "format": "int64"
          },
          "currentAmount": {
            "type": "integer",
            "format": "int64"
          },
          "orderAmount": {
            "type": "integer",
            "format": "int64"
          },
          "sendAmount": {
            "type": "integer",
            "format": "int64"
          },
          "remainingAmount": {
            "type": "integer",
            "format": "int64"
          },
          "productName": {
            "type": "string"
          },
          "categoryName": {
            "type": "string"
          },
          "productDescription": {
            "type": "string"
          },
          "pendingStatus": {
            "type": "string",
            "enum": [
              "WAITING",
              "CONFIRMED"
            ]
          },
          "number": {
            "type": "integer",
            "format": "int32"
          },
          "groupId": {
            "type": "string"
          },
          "orderFromWarehouseProductId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "WarehouseRemovalReadResponse": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "cabinetName": {
            "type": "string"
          },
          "personWhoPlacedOrder": {
            "type": "string"
          },
          "warehouseRemovalProducts": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/WarehouseRemovalProductResponse"
            }
          },
          "number": {
            "type": "integer",
            "format": "int32"
          },
          "sendAmount": {
            "type": "integer",
            "format": "int64"
          },
          "orderAmount": {
            "type": "integer",
            "format": "int64"
          },
          "remainingAmount": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "WarehouseRemovalProductReadResponse": {
        "type": "object",
        "properties": {
          "warehouseRemovalId": {
            "type": "integer",
            "format": "int64"
          },
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "number": {
            "type": "integer",
            "format": "int32"
          },
          "pendingStatus": {
            "type": "string",
            "enum": [
              "WAITING",
              "CONFIRMED"
            ]
          }
        }
      },
      "WarehouseRemovalCreateRequest": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "warehouseRemovalId": {
            "type": "integer",
            "format": "int64"
          },
          "requests": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/WarehouseRemovalProductCreateRequest"
            }
          },
          "description": {
            "type": "string"
          }
        }
      },
      "WarehouseRemovalProductCreateRequest": {
        "type": "object",
        "properties": {
          "orderFromWarehouseProductId": {
            "type": "integer",
            "format": "int64"
          },
          "currentExpenses": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "WarehouseReceiptsRequest": {
        "type": "object",
        "properties": {
          "pendingStatus": {
            "type": "string",
            "enum": [
              "WAITING",
              "CONFIRMED"
            ]
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "WarehouseEntrySearchRequest": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "WarehouseEntryReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "number": {
            "type": "integer",
            "format": "int32"
          },
          "sumPrice": {
            "type": "number"
          }
        }
      },
      "WarehouseEntryCreateRequest": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "warehouseEntryProductCreateRequests": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/WarehouseEntryProductCreateRequest"
            }
          },
          "description": {
            "type": "string"
          }
        }
      },
      "WarehouseEntryProductCreateRequest": {
        "type": "object",
        "properties": {
          "categoryId": {
            "type": "integer",
            "format": "int64"
          },
          "productId": {
            "type": "integer",
            "format": "int64"
          },
          "quantity": {
            "type": "integer",
            "format": "int64"
          },
          "price": {
            "type": "number"
          }
        }
      },
      "TeethRequest": {
        "type": "object",
        "properties": {
          "toothNo": {
            "type": "integer",
            "format": "int64"
          },
          "toothType": {
            "type": "string",
            "enum": [
              "CHILD",
              "ADULT"
            ]
          },
          "toothLocation": {
            "type": "string",
            "enum": [
              "TOP_LEFT",
              "TOP_RIGHT",
              "BOTTOM_RIGHT",
              "BOTTOM_LEFT",
              "MEDIUM"
            ]
          }
        }
      },
      "TeethResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "toothNo": {
            "type": "integer",
            "format": "int64"
          },
          "toothType": {
            "type": "string",
            "enum": [
              "CHILD",
              "ADULT"
            ]
          },
          "toothLocation": {
            "type": "string",
            "enum": [
              "TOP_LEFT",
              "TOP_RIGHT",
              "BOTTOM_RIGHT",
              "BOTTOM_LEFT",
              "MEDIUM"
            ]
          },
          "examinations": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ExaminationResponse"
            }
          },
          "operations": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/TeethOperationResponse"
            }
          }
        }
      },
      "CreateTeethRequest": {
        "required": [
          "toothLocation",
          "toothNo",
          "toothType"
        ],
        "type": "object",
        "properties": {
          "toothNo": {
            "type": "integer",
            "format": "int64"
          },
          "toothType": {
            "type": "string",
            "enum": [
              "CHILD",
              "ADULT"
            ]
          },
          "toothLocation": {
            "type": "string",
            "enum": [
              "TOP_LEFT",
              "TOP_RIGHT",
              "BOTTOM_RIGHT",
              "BOTTOM_LEFT",
              "MEDIUM"
            ]
          }
        }
      },
      "SearchTeethOperationRequest": {
        "type": "object",
        "properties": {
          "operationName": {
            "type": "string"
          }
        }
      },
      "CreateTeethOperationRequest": {
        "type": "object",
        "properties": {
          "teethId": {
            "type": "integer",
            "format": "int64"
          },
          "opTypeAndItemRequests": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OpTypeAndItemRequest"
            }
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "TeethExaminationSearchRequest": {
        "type": "object",
        "properties": {
          "examinationName": {
            "type": "string"
          }
        }
      },
      "TeethExaminationRequest": {
        "required": [
          "examinationId",
          "teethId"
        ],
        "type": "object",
        "properties": {
          "teethId": {
            "type": "integer",
            "format": "int64"
          },
          "examinationId": {
            "type": "integer",
            "format": "int64"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "TechnicianSearchRequest": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "surname": {
            "type": "string"
          },
          "patronymic": {
            "type": "string"
          },
          "phone": {
            "type": "string"
          },
          "finCode": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PageCriteria": {
        "type": "object",
        "properties": {
          "page": {
            "type": "integer",
            "format": "int32"
          },
          "count": {
            "type": "integer",
            "format": "int32"
          }
        }
      },
      "PageResponseTechnicianReadResponse": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/TechnicianReadResponse"
            }
          }
        }
      },
      "TechnicianReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "surname": {
            "type": "string"
          },
          "patronymic": {
            "type": "string"
          },
          "birthDate": {
            "type": "string",
            "format": "date"
          },
          "phone": {
            "type": "string"
          },
          "phone2": {
            "type": "string"
          },
          "homePhone": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "finCode": {
            "type": "string"
          },
          "genderStatus": {
            "type": "string",
            "enum": [
              "MAN",
              "WOMAN"
            ]
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "TechnicianCreateRequest": {
        "required": [
          "authorities",
          "dateOfBirth",
          "finCode",
          "genderStatus",
          "name",
          "password",
          "patronymic",
          "phone",
          "surname",
          "username"
        ],
        "type": "object",
        "properties": {
          "username": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "password": {
            "pattern": "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!_]).{8,}$",
            "type": "string"
          },
          "name": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "surname": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "finCode": {
            "pattern": "^[A-Z0-9]{7}$",
            "type": "string"
          },
          "dateOfBirth": {
            "type": "string",
            "format": "date"
          },
          "phone": {
            "pattern": "\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}",
            "type": "string"
          },
          "genderStatus": {
            "type": "string",
            "enum": [
              "MAN",
              "WOMAN"
            ]
          },
          "patronymic": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "email": {
            "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            "type": "string"
          },
          "phone2": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "homePhone": {
            "type": "string"
          },
          "authorities": {
            "uniqueItems": true,
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "ADMIN",
                "DOCTOR_FULL_PERMISSION",
                "DOCTOR",
                "RECEPTION",
                "WAREHOUSE_MAN",
                "USER",
                "PATIENT",
                "ACCOUNTANT",
                "TECHNICIAN",
                "SUPER_ADMIN"
              ]
            }
          }
        }
      },
      "SpecializationCategoryCreateRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      },
      "RoomStockRequest": {
        "type": "object",
        "properties": {
          "cabinetName": {
            "type": "string"
          },
          "categoryName": {
            "type": "string"
          },
          "productName": {
            "type": "string"
          },
          "productNo": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "RoomStockResponse": {
        "type": "object",
        "properties": {
          "categoryName": {
            "type": "string"
          },
          "productName": {
            "type": "string"
          },
          "productCode": {
            "type": "string"
          },
          "entryQuantity": {
            "type": "number",
            "format": "double"
          },
          "usedQuantity": {
            "type": "number",
            "format": "double"
          },
          "remainingQuantity": {
            "type": "number",
            "format": "double"
          }
        }
      },
      "ReservationSearchRequest": {
        "type": "object",
        "properties": {
          "doctorName": {
            "type": "string"
          },
          "doctorSurname": {
            "type": "string"
          },
          "patientName": {
            "type": "string"
          },
          "patientSurname": {
            "type": "string"
          },
          "endDate": {
            "type": "string",
            "format": "date"
          },
          "startDate": {
            "type": "string",
            "format": "date"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PageResponseReservationReadResponse": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ReservationReadResponse"
            }
          }
        }
      },
      "ReservationReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "mobilePhone": {
            "type": "string"
          },
          "doctor": {
            "type": "string"
          },
          "patient": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "startDate": {
            "type": "string",
            "format": "date"
          },
          "endDate": {
            "type": "string",
            "format": "date"
          },
          "startTime": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "endTime": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "ReservationCreateRequest": {
        "required": [
          "doctorId",
          "endDate",
          "endTime",
          "patientId",
          "startDate",
          "startTime"
        ],
        "type": "object",
        "properties": {
          "startDate": {
            "type": "string",
            "format": "date"
          },
          "endDate": {
            "type": "string",
            "format": "date"
          },
          "startTime": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "endTime": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "doctorId": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "weekDays": {
            "uniqueItems": true,
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY"
              ]
            }
          },
          "validDateRange": {
            "type": "boolean"
          },
          "validTimeRange": {
            "type": "boolean"
          }
        }
      },
      "ReservationCreateResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "weekDays": {
            "uniqueItems": true,
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY"
              ]
            }
          },
          "doctorId": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "startDate": {
            "type": "string",
            "format": "date"
          },
          "endDate": {
            "type": "string",
            "format": "date"
          },
          "startTime": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "endTime": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "RecipeCreateRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      },
      "ProductSearchRequest": {
        "type": "object",
        "properties": {
          "productName": {
            "type": "string"
          },
          "productNo": {
            "type": "integer",
            "format": "int64"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "ProductRequest": {
        "required": [
          "categoryId",
          "productName",
          "productNo",
          "productTitle"
        ],
        "type": "object",
        "properties": {
          "categoryId": {
            "type": "integer",
            "format": "int64"
          },
          "productName": {
            "type": "string"
          },
          "productNo": {
            "type": "integer",
            "format": "int64"
          },
          "productTitle": {
            "type": "string"
          }
        }
      },
      "ProductCategorySearchRequest": {
        "type": "object",
        "properties": {
          "categoryName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "ProductCategoryRequest": {
        "required": [
          "categoryName"
        ],
        "type": "object",
        "properties": {
          "categoryName": {
            "type": "string"
          }
        }
      },
      "PriceCategoryCreateRequest": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PermissionSearchRequest": {
        "type": "object",
        "properties": {
          "permissionName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "ModulePermission": {
        "type": "object",
        "properties": {
          "moduleUrl": {
            "type": "string"
          },
          "actions": {
            "uniqueItems": true,
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "READ",
                "CREATE",
                "UPDATE",
                "DELETE",
                "STATUS",
                "SORT"
              ]
            }
          }
        }
      },
      "PermissionCreateRequest": {
        "type": "object",
        "properties": {
          "permissionName": {
            "type": "string"
          },
          "permissions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ModulePermission"
            }
          }
        }
      },
      "PatientSearchRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "surname": {
            "type": "string"
          },
          "fullName": {
            "type": "string"
          },
          "finCode": {
            "type": "string"
          },
          "genderStatus": {
            "type": "string",
            "enum": [
              "MAN",
              "WOMAN"
            ]
          },
          "phone": {
            "type": "string"
          }
        }
      },
      "PatientReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "surname": {
            "type": "string"
          },
          "patronymic": {
            "type": "string"
          },
          "finCode": {
            "type": "string"
          },
          "genderStatus": {
            "type": "string",
            "enum": [
              "MAN",
              "WOMAN"
            ]
          },
          "dateOfBirth": {
            "type": "string",
            "format": "date"
          },
          "priceCategoryName": {
            "type": "string"
          },
          "specializationCategoryName": {
            "type": "string"
          },
          "baseUser": {
            "type": "string"
          },
          "phone": {
            "type": "string"
          },
          "workPhone": {
            "type": "string"
          },
          "homePhone": {
            "type": "string"
          },
          "homeAddress": {
            "type": "string"
          },
          "workAddress": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "isBlocked": {
            "type": "boolean"
          }
        }
      },
      "PatientCreateRequest": {
        "required": [
          "doctorId",
          "genderStatus",
          "name",
          "patronymic",
          "priceCategoryName",
          "surname"
        ],
        "type": "object",
        "properties": {
          "name": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "surname": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "patronymic": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "finCode": {
            "pattern": "^$|^[A-Z0-9]{7}$",
            "type": "string"
          },
          "genderStatus": {
            "type": "string",
            "enum": [
              "MAN",
              "WOMAN"
            ]
          },
          "dateOfBirth": {
            "type": "string",
            "format": "date"
          },
          "priceCategoryName": {
            "type": "string"
          },
          "specializationName": {
            "type": "string"
          },
          "doctorId": {
            "type": "string"
          },
          "phone": {
            "pattern": "\\(\\d{3}\\)-\\d{3}-\\d{4}",
            "type": "string"
          },
          "workPhone": {
            "pattern": "^$|\\(\\d{3}\\)-\\d{3}-\\d{4}",
            "type": "string"
          },
          "homePhone": {
            "pattern": "^$|\\(\\d{3}\\)-\\d{3}-\\d{4}",
            "type": "string"
          },
          "homeAddress": {
            "type": "string"
          },
          "workAddress": {
            "type": "string"
          },
          "email": {
            "pattern": "^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            "type": "string"
          }
        }
      },
      "PatientCreateResponse": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "surname": {
            "type": "string"
          },
          "patronymic": {
            "type": "string"
          },
          "finCode": {
            "type": "string"
          },
          "genderStatus": {
            "type": "string",
            "enum": [
              "MAN",
              "WOMAN"
            ]
          },
          "dateOfBirth": {
            "type": "string",
            "format": "date"
          },
          "priceCategoryName": {
            "type": "string"
          },
          "specializationCategoryName": {
            "type": "string"
          },
          "phone": {
            "type": "string"
          },
          "workPhone": {
            "type": "string"
          },
          "homePhone": {
            "type": "string"
          },
          "homeAddress": {
            "type": "string"
          },
          "workAddress": {
            "type": "string"
          },
          "email": {
            "type": "string"
          }
        }
      },
      "PatXrayCreateReq": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "description": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "PatVideosCreateReq": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "description": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "PatientTreatmentSaveRequest": {
        "type": "object",
        "properties": {
          "checkedPlanIds": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid"
            }
          }
        }
      },
      "PatientPlansOfTreatmentResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "partOfToothId": {
            "type": "integer",
            "format": "int64"
          },
          "operationName": {
            "type": "string"
          },
          "operationCode": {
            "type": "string"
          },
          "price": {
            "type": "number"
          }
        }
      },
      "PlanDetailDto": {
        "type": "object",
        "properties": {
          "patientPlanId": {
            "type": "string",
            "format": "uuid"
          },
          "categoryId": {
            "type": "integer",
            "format": "int64"
          },
          "categoryName": {
            "type": "string"
          },
          "categoryCode": {
            "type": "string"
          },
          "toothNo": {
            "type": "integer",
            "format": "int64"
          },
          "details": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PatientPlansOfTreatmentResponse"
            }
          }
        }
      },
      "ReadByPatientPlanMainIdOfTreatment": {
        "type": "object",
        "properties": {
          "key": {
            "type": "string"
          },
          "patientPlanMainId": {
            "type": "string",
            "format": "uuid"
          },
          "isSave": {
            "type": "boolean"
          },
          "plans": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PlanDetailDto"
            }
          }
        }
      },
      "CategoryOfOperationDto": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "categoryName": {
            "type": "string"
          },
          "categoryCode": {
            "type": "string"
          },
          "opTypeItemReadResponses": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OpTypeItemReadResponse"
            }
          }
        }
      },
      "OpTypeItemReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "operationName": {
            "type": "string"
          },
          "operationCode": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "price": {
            "type": "number"
          }
        }
      },
      "PatientPlansRequest": {
        "type": "object",
        "properties": {
          "planId": {
            "type": "string",
            "format": "uuid"
          },
          "isChecked": {
            "type": "boolean"
          }
        }
      },
      "PatientTreatmentRequest": {
        "type": "object",
        "properties": {
          "planMainId": {
            "type": "string",
            "format": "uuid"
          },
          "patientPlansRequests": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PatientPlansRequest"
            }
          }
        }
      },
      "PatRecipeCreateReq": {
        "required": [
          "date",
          "patientId",
          "recipeId"
        ],
        "type": "object",
        "properties": {
          "recipeId": {
            "type": "integer",
            "format": "int64"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          }
        }
      },
      "PatientPlansCreateRequest": {
        "type": "object",
        "properties": {
          "patientPlanMainId": {
            "type": "string",
            "format": "uuid"
          },
          "toothId": {
            "type": "integer",
            "format": "int64"
          },
          "categoryId": {
            "type": "integer",
            "format": "int64"
          },
          "operationId": {
            "type": "integer",
            "format": "int64"
          },
          "partOfTeethIds": {
            "type": "array",
            "items": {
              "type": "integer",
              "format": "int64"
            }
          }
        }
      },
      "PatientPlansMainCreateRequest": {
        "type": "object",
        "properties": {
          "planName": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "key": {
            "type": "string"
          },
          "insuranceId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "PatPhotosCreateReq": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "description": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "PatientInsuranceCreateRequest": {
        "required": [
          "expirationDate",
          "insuranceCompanyId",
          "policyNumber"
        ],
        "type": "object",
        "properties": {
          "insuranceCompanyId": {
            "type": "integer",
            "format": "int64"
          },
          "policyNumber": {
            "type": "string"
          },
          "expirationDate": {
            "type": "string",
            "format": "date"
          },
          "deductibleAmount": {
            "type": "number"
          },
          "annualMaxAmount": {
            "type": "number"
          },
          "description": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "PatInsuranceBalanceCreateReq": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "amount": {
            "type": "number"
          },
          "patientInsuranceId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "RequestToSeeTheExaminations": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          }
        }
      },
      "PatientExaminationsResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "toothNo": {
            "type": "integer",
            "format": "int64"
          },
          "diagnosis": {
            "type": "string"
          },
          "doctorName": {
            "type": "string"
          }
        }
      },
      "PatBlacklistSearchReq": {
        "type": "object",
        "properties": {
          "fullName": {
            "type": "string"
          },
          "finCode": {
            "type": "string"
          },
          "mobilePhone": {
            "type": "string"
          }
        }
      },
      "PageResponsePatBlacklistReadRes": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PatBlacklistReadRes"
            }
          }
        }
      },
      "PatBlacklistReadRes": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "fullName": {
            "type": "string"
          },
          "finCode": {
            "type": "string"
          },
          "mobilePhone": {
            "type": "string"
          },
          "addedDate": {
            "type": "string",
            "format": "date"
          },
          "blacklistReason": {
            "type": "string"
          }
        }
      },
      "PatBlacklistCreateReq": {
        "required": [
          "blacklistId",
          "patientId"
        ],
        "type": "object",
        "properties": {
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "blacklistId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "PatAnamnesisCreateReq": {
        "required": [
          "anamnesisCategoryName",
          "anamnesisName"
        ],
        "type": "object",
        "properties": {
          "anamnesisName": {
            "type": "string"
          },
          "anamnesisCategoryName": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "OrderFromWarehouseSearchRequest": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "OrderFromWarehouseReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "cabinetName": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "personWhoPlacedOrder": {
            "type": "string"
          },
          "number": {
            "type": "integer",
            "format": "int32"
          },
          "sumQuantity": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "OrderFromWarehouseCreateRequest": {
        "required": [
          "cabinetName",
          "date",
          "time"
        ],
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "cabinetName": {
            "type": "string"
          },
          "orderFromWarehouseProductRequests": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OrderFromWarehouseProductRequest"
            }
          },
          "description": {
            "type": "string"
          }
        }
      },
      "OrderFromWarehouseProductRequest": {
        "type": "object",
        "properties": {
          "warehouseEntryId": {
            "type": "integer",
            "format": "int64"
          },
          "warehouseEntryProductId": {
            "type": "integer",
            "format": "int64"
          },
          "categoryId": {
            "type": "integer",
            "format": "int64"
          },
          "productId": {
            "type": "integer",
            "format": "int64"
          },
          "quantity": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "OpTypeCreateRequest": {
        "required": [
          "categoryName"
        ],
        "type": "object",
        "properties": {
          "categoryName": {
            "type": "string"
          },
          "categoryCode": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "colorSelection": {
            "type": "boolean"
          },
          "implantSelection": {
            "type": "boolean"
          },
          "insurances": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OpTypeInsuranceRequest"
            }
          }
        }
      },
      "OpTypeItemCreateRequest": {
        "type": "object",
        "properties": {
          "opTypeId": {
            "type": "integer",
            "format": "int64"
          },
          "operationName": {
            "type": "string"
          },
          "operationCode": {
            "type": "string"
          },
          "showTechnic": {
            "type": "boolean"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "amount": {
            "type": "number"
          },
          "insurances": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OpTypeItemInsurances"
            }
          }
        }
      },
      "OpTypeItemInsurances": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "amount": {
            "type": "number"
          },
          "insuranceCompanyId": {
            "type": "integer",
            "format": "int64"
          },
          "specificCode": {
            "type": "string"
          }
        }
      },
      "MetalCreateReq": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      },
      "MedicineCreateRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "recipeId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "DentalOrderCreateReq": {
        "required": [
          "checkDate",
          "deliveryDate",
          "dentalWorkType",
          "doctorId",
          "patientId",
          "technicianId"
        ],
        "type": "object",
        "properties": {
          "checkDate": {
            "type": "string",
            "format": "date"
          },
          "deliveryDate": {
            "type": "string",
            "format": "date"
          },
          "description": {
            "type": "string"
          },
          "dentalWorkType": {
            "type": "string"
          },
          "orderDentureInfo": {
            "$ref": "#/components/schemas/OrderDentureInfo"
          },
          "toothDetailIds": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/DentalOrderToothDetailIds"
            }
          },
          "teethList": {
            "type": "array",
            "items": {
              "type": "integer",
              "format": "int64"
            }
          },
          "doctorId": {
            "type": "string"
          },
          "technicianId": {
            "type": "string",
            "format": "uuid"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "files": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "DentalOrderPaymentCreateReq": {
        "required": [
          "amount",
          "technicianId"
        ],
        "type": "object",
        "properties": {
          "technicianId": {
            "type": "string",
            "format": "uuid"
          },
          "amount": {
            "type": "number"
          }
        }
      },
      "InsuranceCreateRequest": {
        "required": [
          "companyName"
        ],
        "type": "object",
        "properties": {
          "companyName": {
            "type": "string"
          },
          "deductibleAmount": {
            "type": "number"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "ImplantSearchRequest": {
        "type": "object",
        "properties": {
          "implantBrandName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "ImplantReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "implantBrandName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "implantSizesReads": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ImplantSizesRead"
            }
          }
        }
      },
      "ImplantSizesRead": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "diameter": {
            "type": "number",
            "format": "double"
          },
          "length": {
            "type": "number",
            "format": "double"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "ImplantCreateRequest": {
        "type": "object",
        "properties": {
          "implantBrandName": {
            "type": "string"
          }
        }
      },
      "ImplantSizeSearchRequest": {
        "type": "object",
        "properties": {
          "diameter": {
            "type": "number",
            "format": "double"
          },
          "length": {
            "type": "number",
            "format": "double"
          }
        }
      },
      "ImplantSizeSearchStatusRequest": {
        "type": "object",
        "properties": {
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "ImplantSizeCreateRequest": {
        "type": "object",
        "properties": {
          "implantSizeId": {
            "type": "integer",
            "format": "int64"
          },
          "diameter": {
            "type": "number",
            "format": "double"
          },
          "length": {
            "type": "number",
            "format": "double"
          }
        }
      },
      "AppointmentTypeRequestId": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "NewAppointmentRequest": {
        "required": [
          "cabinetName",
          "patientId"
        ],
        "type": "object",
        "properties": {
          "cabinetName": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "appointment": {
            "type": "string",
            "enum": [
              "MEETING",
              "CAME",
              "CANCELED"
            ]
          },
          "appointmentTypeRequestIds": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AppointmentTypeRequestId"
            }
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "period": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "GarnitureCreateReq": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      },
      "CreateExaminationRequest": {
        "required": [
          "examinationTypeName"
        ],
        "type": "object",
        "properties": {
          "examinationTypeName": {
            "type": "string"
          }
        }
      },
      "DeletionFromWarehouseSearchRequest": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "DeletionFromWarehouseResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "number": {
            "type": "integer",
            "format": "int32"
          }
        }
      },
      "DeletionFromWarehouseCreateRequest": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "description": {
            "type": "string"
          },
          "deletionFromWarehouseProductRequests": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/DeletionFromWarehouseProductRequest"
            }
          }
        }
      },
      "ColorCreateReq": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      },
      "CeramicCreateReq": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      },
      "CabinetSearchRequest": {
        "type": "object",
        "properties": {
          "cabinetName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "CabinetCreateRequest": {
        "type": "object",
        "properties": {
          "cabinetName": {
            "type": "string"
          }
        }
      },
      "BlacklistResultCreateReq": {
        "required": [
          "statusName"
        ],
        "type": "object",
        "properties": {
          "statusName": {
            "type": "string"
          }
        }
      },
      "AuthRequest": {
        "required": [
          "password",
          "username"
        ],
        "type": "object",
        "properties": {
          "username": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        }
      },
      "AuthResponse": {
        "type": "object",
        "properties": {
          "tokenPair": {
            "$ref": "#/components/schemas/TokenPair"
          }
        }
      },
      "TokenPair": {
        "type": "object",
        "properties": {
          "accessToken": {
            "type": "string"
          },
          "refreshToken": {
            "type": "string"
          }
        }
      },
      "AppointmentTypeSearchRequest": {
        "type": "object",
        "properties": {
          "appointmentTypeName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "AppointmentTypeCreateRequest": {
        "required": [
          "appointmentTypeName"
        ],
        "type": "object",
        "properties": {
          "appointmentTypeName": {
            "type": "string"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          }
        }
      },
      "AnemnesisListCreateReq": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "anamnesisCategoryId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "AnemnesisCatCreateReq": {
        "required": [
          "name"
        ],
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "AddWorkerSearchRequest": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "surname": {
            "type": "string"
          },
          "patronymic": {
            "type": "string"
          },
          "phone": {
            "type": "string"
          },
          "enabled": {
            "type": "boolean"
          }
        }
      },
      "AddWorkerReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "surname": {
            "type": "string"
          },
          "patronymic": {
            "type": "string"
          },
          "finCode": {
            "type": "string"
          },
          "colorCode": {
            "type": "string"
          },
          "enabled": {
            "type": "boolean"
          },
          "genderStatus": {
            "type": "string",
            "enum": [
              "MAN",
              "WOMAN"
            ]
          },
          "dateOfBirth": {
            "type": "string",
            "format": "date"
          },
          "degree": {
            "type": "string"
          },
          "phone": {
            "type": "string"
          },
          "phone2": {
            "type": "string"
          },
          "phone3": {
            "type": "string"
          },
          "homePhone": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "experience": {
            "type": "integer",
            "format": "int32"
          },
          "permissions": {
            "uniqueItems": true,
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "AddWorkerCreateRequest": {
        "required": [
          "dateOfBirth",
          "genderStatus",
          "name",
          "patronymic",
          "surname",
          "username"
        ],
        "type": "object",
        "properties": {
          "username": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "password": {
            "pattern": "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!_]).{8,}$",
            "type": "string"
          },
          "name": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "surname": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "patronymic": {
            "maxLength": 20,
            "minLength": 3,
            "type": "string"
          },
          "finCode": {
            "pattern": "^$|^[A-Z0-9]{7}$",
            "type": "string"
          },
          "colorCode": {
            "type": "string"
          },
          "genderStatus": {
            "type": "string",
            "enum": [
              "MAN",
              "WOMAN"
            ]
          },
          "dateOfBirth": {
            "type": "string",
            "format": "date"
          },
          "degree": {
            "type": "string"
          },
          "phone": {
            "pattern": "\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}",
            "type": "string"
          },
          "phone2": {
            "pattern": "\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}",
            "type": "string"
          },
          "phone3": {
            "pattern": "\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}",
            "type": "string"
          },
          "homePhone": {
            "pattern": "\\(\\d{3}\\)-\\d{3}-\\d{2}-\\d{2}",
            "type": "string"
          },
          "email": {
            "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "experience": {
            "type": "integer",
            "format": "int32"
          },
          "permissions": {
            "uniqueItems": true,
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "AddWorkerCreateResponse": {
        "type": "object",
        "properties": {
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "surname": {
            "type": "string"
          },
          "patronymic": {
            "type": "string"
          },
          "finCode": {
            "type": "string"
          },
          "colorCode": {
            "type": "string"
          },
          "enabled": {
            "type": "boolean"
          },
          "genderStatus": {
            "type": "string",
            "enum": [
              "MAN",
              "WOMAN"
            ]
          },
          "dateOfBirth": {
            "type": "string",
            "format": "date"
          },
          "degree": {
            "type": "string"
          },
          "phone": {
            "type": "string"
          },
          "phone2": {
            "type": "string"
          },
          "homePhone": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "experience": {
            "type": "integer",
            "format": "int32"
          },
          "permissions": {
            "uniqueItems": true,
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "PatInsuranceUpdateStatusReq": {
        "type": "object",
        "properties": {
          "patientId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "PatientInsuranceReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "insuranceCompanyName": {
            "type": "string"
          },
          "policyNumber": {
            "type": "string"
          },
          "expirationDate": {
            "type": "string",
            "format": "date"
          },
          "deductibleAmount": {
            "type": "number"
          },
          "annualMaxAmount": {
            "type": "number"
          },
          "remainingInsuranceCount": {
            "type": "integer",
            "format": "int64"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "description": {
            "type": "string"
          }
        }
      },
      "UpdateOrderPrice": {
        "required": [
          "price"
        ],
        "type": "object",
        "properties": {
          "price": {
            "type": "number"
          }
        }
      },
      "UpdateLabOrderStatus": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "dentalWorkStatus": {
            "type": "string",
            "enum": [
              "PENDING",
              "SENT_TO_TECHNICIAN",
              "DOCTOR_RETURNED_TO_TECHNICIAN",
              "SENT_TO_DOCTOR",
              "RECEIVED_FROM_TECHNICIAN"
            ]
          }
        }
      },
      "WarehouseReceiptsInfoResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "cabinetName": {
            "type": "string"
          },
          "personWhoPlacedOrder": {
            "type": "string"
          },
          "outOfTheWarehouseDtos": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OutOfTheWarehouseDto"
            }
          },
          "orderQuantity": {
            "type": "integer",
            "format": "int64"
          },
          "incomingQuantity": {
            "type": "integer",
            "format": "int64"
          },
          "pendingStatus": {
            "type": "string",
            "enum": [
              "WAITING",
              "CONFIRMED"
            ]
          },
          "description": {
            "type": "string"
          }
        }
      },
      "WarehouseEntry": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "description": {
            "type": "string"
          },
          "number": {
            "type": "integer",
            "format": "int32"
          },
          "sumPrice": {
            "type": "number"
          }
        }
      },
      "WarehouseEntryProduct": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "warehouseEntry": {
            "$ref": "#/components/schemas/WarehouseEntry"
          },
          "categoryId": {
            "type": "integer",
            "format": "int64"
          },
          "categoryName": {
            "type": "string"
          },
          "productName": {
            "type": "string"
          },
          "productTitle": {
            "type": "string"
          },
          "productId": {
            "type": "integer",
            "format": "int64"
          },
          "quantity": {
            "type": "integer",
            "format": "int64"
          },
          "usedQuantity": {
            "type": "integer",
            "format": "int64"
          },
          "price": {
            "type": "number"
          }
        }
      },
      "WarehouseEntryResponse": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "warehouseEntryProducts": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/WarehouseEntryProduct"
            }
          },
          "number": {
            "type": "integer",
            "format": "int32"
          },
          "description": {
            "type": "string"
          },
          "sumPrice": {
            "type": "number"
          }
        }
      },
      "SearchByNameAndStatus": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string"
          }
        }
      },
      "PageResponseRecipeReadResponse": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/RecipeReadResponse"
            }
          }
        }
      },
      "RecipeReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "ProductCategoryReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "categoryName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "products": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ProductReadResponse"
            }
          }
        }
      },
      "PriceCategorySearchRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PriceCategoryReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "InfoPermissionResponse": {
        "type": "object",
        "properties": {
          "permissionName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "modulePermissions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ModulePermission"
            }
          }
        }
      },
      "PatXrayReadRes": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "description": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "url": {
            "type": "string"
          }
        }
      },
      "PatVideosReadRes": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "description": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "url": {
            "type": "string"
          }
        }
      },
      "MedicineReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "recipeId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "PatRecipeReadRes": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "recipeId": {
            "type": "integer",
            "format": "int64"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "recipeName": {
            "type": "string"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "medicines": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/MedicineReadResponse"
            }
          }
        }
      },
      "PatPhotosReadRes": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "description": {
            "type": "string"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          },
          "url": {
            "type": "string"
          }
        }
      },
      "PatInsuranceBalanceReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "amount": {
            "type": "number"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "patientInsuranceId": {
            "type": "integer",
            "format": "int64"
          },
          "url": {
            "type": "string"
          }
        }
      },
      "PatAnamnesisReadRes": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "anamnesisName": {
            "type": "string"
          },
          "anamnesisCategoryName": {
            "type": "string"
          },
          "addedByName": {
            "type": "string"
          },
          "addedDateTime": {
            "type": "string",
            "format": "date"
          },
          "patientId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "OperationTypeSearchRequest": {
        "required": [
          "categoryName"
        ],
        "type": "object",
        "properties": {
          "categoryName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "OpInsuranceReadResponse": {
        "type": "object",
        "properties": {
          "insuranceCompanyId": {
            "type": "integer",
            "format": "int64"
          },
          "companyName": {
            "type": "string"
          },
          "deductibleAmount": {
            "type": "number"
          }
        }
      },
      "OpTypeReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "categoryName": {
            "type": "string"
          },
          "categoryCode": {
            "type": "string"
          },
          "colorSelection": {
            "type": "boolean"
          },
          "implantSelection": {
            "type": "boolean"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "opTypeItemCount": {
            "type": "integer",
            "format": "int64"
          },
          "insurances": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OpInsuranceReadResponse"
            }
          }
        }
      },
      "PageResponseOpTypeReadResponse": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OpTypeReadResponse"
            }
          }
        }
      },
      "OpTypeItemSearchRequest": {
        "type": "object",
        "properties": {
          "operationName": {
            "type": "string"
          },
          "operationCode": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PageResponseOpTypeItemReadResponse": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OpTypeItemReadResponse"
            }
          }
        }
      },
      "OpTypeItemInsuranceDto": {
        "type": "object",
        "properties": {
          "insuranceCompanyId": {
            "type": "integer",
            "format": "int64"
          },
          "companyName": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "amount": {
            "type": "number"
          },
          "specificCode": {
            "type": "string"
          }
        }
      },
      "OpTypeItemReadByIdResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "operationName": {
            "type": "string"
          },
          "operationCode": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "price": {
            "type": "number"
          },
          "insurances": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OpTypeItemInsuranceDto"
            }
          }
        }
      },
      "MetalReadRes": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PageResponseMetalReadRes": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/MetalReadRes"
            }
          }
        }
      },
      "MedicineSearchRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "recipeId": {
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "PageResponseMedicineReadResponse": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/MedicineReadResponse"
            }
          }
        }
      },
      "DentalOrderTeethListResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "toothNo": {
            "type": "integer",
            "format": "int64"
          },
          "toothType": {
            "type": "string"
          },
          "toothLocation": {
            "type": "string"
          }
        }
      },
      "DentalOrderToothDetailResponse": {
        "type": "object",
        "properties": {
          "colorId": {
            "type": "integer",
            "format": "int64"
          },
          "colorName": {
            "type": "string"
          },
          "metalId": {
            "type": "integer",
            "format": "int64"
          },
          "metalName": {
            "type": "string"
          },
          "ceramicId": {
            "type": "integer",
            "format": "int64"
          },
          "ceramicName": {
            "type": "string"
          }
        }
      },
      "TechnicianOrderResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "checkDate": {
            "type": "string",
            "format": "date"
          },
          "deliveryDate": {
            "type": "string",
            "format": "date"
          },
          "description": {
            "type": "string"
          },
          "price": {
            "type": "number"
          },
          "orderDentureInfo": {
            "$ref": "#/components/schemas/OrderDentureInfo"
          },
          "dentalWorkType": {
            "type": "string",
            "enum": [
              "PROTEZ",
              "QAPAQ"
            ]
          },
          "dentalWorkStatus": {
            "type": "string",
            "enum": [
              "PENDING",
              "SENT_TO_TECHNICIAN",
              "DOCTOR_RETURNED_TO_TECHNICIAN",
              "SENT_TO_DOCTOR",
              "RECEIVED_FROM_TECHNICIAN"
            ]
          },
          "toothDetails": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/DentalOrderToothDetailResponse"
            }
          },
          "teethList": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/DentalOrderTeethListResponse"
            }
          },
          "doctor": {
            "type": "string"
          },
          "technician": {
            "type": "string"
          },
          "patient": {
            "type": "string"
          },
          "urls": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "TechnicianReportResponse": {
        "type": "object",
        "properties": {
          "technicianId": {
            "type": "string",
            "format": "uuid"
          },
          "fullName": {
            "type": "string"
          },
          "totalDebt": {
            "type": "number"
          },
          "totalPaid": {
            "type": "number"
          },
          "totalRemaining": {
            "type": "number"
          }
        }
      },
      "ICSearchRequest": {
        "type": "object",
        "properties": {
          "companyName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "InsuranceReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "companyName": {
            "type": "string"
          },
          "deductibleAmount": {
            "type": "number"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PageResponseInsuranceReadResponse": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/InsuranceReadResponse"
            }
          }
        }
      },
      "SelectingDoctorViewingPatientResponse": {
        "type": "object",
        "properties": {
          "patientName": {
            "type": "string"
          },
          "appointment": {
            "type": "string",
            "enum": [
              "MEETING",
              "CAME",
              "CANCELED"
            ]
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "period": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "cabinetName": {
            "type": "string"
          }
        }
      },
      "SelectingPatientToReadResponse": {
        "type": "object",
        "properties": {
          "doctorName": {
            "type": "string"
          },
          "patientName": {
            "type": "string"
          },
          "time": {
            "$ref": "#/components/schemas/LocalTime"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "cabinetName": {
            "type": "string"
          },
          "appointment": {
            "type": "string",
            "enum": [
              "MEETING",
              "CAME",
              "CANCELED"
            ]
          }
        }
      },
      "ReadRooms": {
        "type": "object",
        "properties": {
          "cabinetName": {
            "type": "string"
          }
        }
      },
      "GeneralCalendarResponse": {
        "type": "object",
        "properties": {
          "doctorId": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "surname": {
            "type": "string"
          },
          "username": {
            "type": "string"
          }
        }
      },
      "GarnitureReadRes": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PageResponseGarnitureReadRes": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/GarnitureReadRes"
            }
          }
        }
      },
      "ColorReadRes": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PageResponseColorReadRes": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ColorReadRes"
            }
          }
        }
      },
      "CeramicReadRes": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PageResponseCeramicReadRes": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/CeramicReadRes"
            }
          }
        }
      },
      "BlacklistResultSearchReq": {
        "type": "object",
        "properties": {
          "statusName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "BlacklistResultReadRes": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "statusName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PageResponseBlacklistResultReadRes": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/BlacklistResultReadRes"
            }
          }
        }
      },
      "AnemnesisListSearchReq": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "AnamnesisCategory": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "anamnesisList": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AnamnesisList"
            }
          }
        }
      },
      "AnamnesisList": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "anamnesisCategory": {
            "$ref": "#/components/schemas/AnamnesisCategory"
          }
        }
      },
      "PageResponseAnamnesisList": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AnamnesisList"
            }
          }
        }
      },
      "AnemnesisListReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "PageResponseAnemnesisListReadResponse": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AnemnesisListReadResponse"
            }
          }
        }
      },
      "AnemnesisCatSearchReq": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          }
        }
      },
      "AnamnesisCatReadResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "ACTIVE",
              "PASSIVE"
            ]
          },
          "anemnesisListReadResponse": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AnemnesisListReadResponse"
            }
          }
        }
      },
      "PageResponseAnamnesisCatReadResponse": {
        "type": "object",
        "properties": {
          "totalPages": {
            "type": "integer",
            "format": "int32"
          },
          "totalElements": {
            "type": "integer",
            "format": "int64"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AnamnesisCatReadResponse"
            }
          }
        }
      },
      "AddWorkerReadStatusResponse": {
        "type": "object",
        "properties": {
          "role": {
            "type": "string"
          }
        }
      }
    },
    "securitySchemes": {
      "Authorization": {
        "type": "http",
        "in": "header",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  }
}
