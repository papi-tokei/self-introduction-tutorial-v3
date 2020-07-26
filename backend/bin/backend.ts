#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { BackendStack } from "../lib/backend-stack";

const app = new cdk.App();
// TODO: アカウントIDとリージョンを変更すること
const accountInformation = { account: "xxxxxx", region: "yyyyyy" };
new BackendStack(app, "BackendStack", { env: accountInformation });
