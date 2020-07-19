import * as cdk from "@aws-cdk/core";
import { RemovalPolicy } from "@aws-cdk/core";
import { Table, AttributeType } from "@aws-cdk/aws-dynamodb";
import { Function, Runtime, Code } from "@aws-cdk/aws-lambda";
import { RestApi, LambdaIntegration, Cors } from "@aws-cdk/aws-apigateway";

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const suffix = "sample";
    const fn = new Function(this, "Function", {
      functionName: `selfIntroductionTutorial_${suffix}`,
      runtime: Runtime.PYTHON_3_8,
      handler: "index.handler",
      code: Code.fromAsset("lambda"),
      environment: {
        TABLE_NAME: `self_introduction_tutorial_${suffix}`,
      },
    });

    const table = new Table(this, "Table", {
      tableName: `self_introduction_tutorial_${suffix}`,
      partitionKey: { name: "id", type: AttributeType.STRING },
      readCapacity: 1,
      writeCapacity: 1,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    // Lambda関数にテーブルの読み書き権限を付与
    table.grantReadWriteData(fn);

    const api = new RestApi(this, "Api", {
      restApiName: `Self Introduction Tutorial ${suffix}`,
      description: "自己紹介チュートリアル用API",
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS, // this is also the default
      },
    });
    const integration = new LambdaIntegration(fn);
    const userData = api.root.addResource("user-data");
    userData.addMethod("POST", integration);
  }
}
