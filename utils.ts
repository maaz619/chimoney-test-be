import { config } from "dotenv"
import { createClient } from "@supabase/supabase-js";

config()

const supabaseUrl = 'https://wltkydnfcwhktmhtjrky.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY as string
export const CHIMONEY_API_BASE_URL = "https://api-v2-sandbox.chimoney.io/v0.2/"
export const API_KEY = process.env.CHIMONEY_API_KEY as string

export const client = createClient(supabaseUrl, supabaseKey)