#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { BackendStack } from "../lib/backend-stack";

const app = new cdk.App();
// TODO: アカウントIDとリージョンを変更すること
const accountInformation = {
  account: "xxxxxx",
  region: "yyyyyy",
};
// TODO: 複数人で実施する場合は、それぞれ別の名前(サフィックス)に変更すること
const suffix = "sample";
new BackendStack(
  app,
  "BackendStack",
  { env: accountInformation },
  { suffix: suffix }
);
