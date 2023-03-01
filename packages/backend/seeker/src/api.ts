import dotenv from "dotenv";
import Web3 from "web3";
import PocketBase from "pocketbase";

dotenv.config();

// @ts-ignore
export const web3 = new Web3(process.env.RPC_URL);

export const pb = new PocketBase("https://jardoole.xyz");

await pb.collection("users").authWithPassword(process.env.PB_USER, process.env.PB_PW);
