import { redirect } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";
export const prerender = false;

export const load: LayoutServerLoad = async({locals: {getSession, supabase}}) => {
  return {
    session: getSession()
  }
}
