import crypto from "crypto";
import axios from "axios";
import devConfig from "../config/env";

const sumsubSecret: string = devConfig.sumsubSecret??'';
const sumsubToken = devConfig.sumsubToken;

console.log("sumsubToken===========>", sumsubToken, sumsubSecret);

const SUMSUB_BASE_URL = "https://api.sumsub.com";

let config: any = {};
config.baseURL = SUMSUB_BASE_URL;

const createSignature = async (config: any) => {
  console.log("Creating a signature for the request...");

  var ts = Math.floor(Date.now() / 1000) + 50;
  console.log("sumsubSecret=========>", sumsubSecret);
  const signature = crypto.createHmac("sha256", sumsubSecret);
  console.log("signature==========>", signature);
  signature.update(ts + config.method.toUpperCase() + config.url);

  config.headers["X-App-Access-Ts"] = ts;
  config.headers["X-App-Access-Sig"] = signature.digest("hex");
  config.timeout = 6000;
  console.log("config============>", config);
  return config;
};

axios.interceptors.request.use(createSignature, function (error) {
  return Promise.reject(error);
});

const getApplicant = async (applicantId:number) => {
  const url = `/resources/applicants/${applicantId}/one`;

  const headers = {
    Accept: "application/json",
    "X-App-Token": sumsubToken,
  };

  config.method = "GET";
  config.url = url;
  config.headers = headers;
  config.responseType = "json";

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getAccessToken = async (userId:number) => {
  const url = `/resources/accessTokens?userId=${userId}&levelName=basic-kyc-level&ttlInSecs=2000`;

  const headers = {
    Accept: "application/json",
    "X-App-Token": sumsubToken,
  };

  config.method = "POST";
  config.url = url;
  config.headers = headers;
  config.responseType = "json";

  console.log("config for getToken=======>", config);

  try {
    const response = await axios(config);
    console.log("request sent!");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getApplicantVerifStep = async (applicantId:number) => {
  const url = `/resources/applicants/${applicantId}/requiredIdDocsStatus`;

  const headers = {
    Accept: "application/json",
    "X-App-Token": sumsubToken,
  };

  config.method = "GET";
  config.url = url;
  config.headers = headers;
  config.responseType = "json";

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getImage = async (inspectionId:number, imageId:number) => {
  const url = `/resources/inspections/${inspectionId}/resources/${imageId}`;
  console.log(inspectionId, imageId);
  const headers = {
    Accept: "application/json",
    "X-App-Token": sumsubToken,
  };

  config.method = "GET";
  config.url = url;
  config.headers = headers;
  config.responseType = "arraybuffer";
  const response = await axios(config);
  console.log(response.headers);
  const buffer = Buffer.from(response.data, "binary");
  const sizeInBytes = buffer.length;
  console.log(sizeInBytes);
  return response.data;
};

const getImageHeaders = async (inspectionId:number, imageId:number) => {
  const url = `/resources/inspections/${inspectionId}/resources/${imageId}`;
  var ts = Math.floor(Date.now() / 1000) + 250;
  const signature = crypto.createHmac("sha256", sumsubSecret);
  signature.update(ts + "GET" + url);

  const result = {
    ts: ts,
    sig: signature.digest("hex"),
    url: SUMSUB_BASE_URL + url,
    token: sumsubToken,
  };
  return result;
};

export {
  getApplicant,
  getApplicantVerifStep,
  getImage,
  getImageHeaders,
  getAccessToken,
};
