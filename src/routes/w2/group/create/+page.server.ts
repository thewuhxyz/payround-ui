import { goto } from '$app/navigation';
import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type {PageServerLoad} from "./$types"

export const load:PageServerLoad = async ({parent}) => {
	await parent()
}

export const actions: Actions = {
	creategroup: async ({ request, locals }) => {
		// const supabase = locals.supabase;
		const sbHelper = locals.sbHelper
		const session = await sbHelper.getSession();
		// const payroundAdmin = locals.payroundAdmin;

    if (!session) {
			throw redirect(303, '/');
		}

    const formData = Object.fromEntries(await request.formData())
    console.log("forndata:", formData);
    
    const name = formData.name as string
    const description = formData.desc as string


		const userId =await sbHelper.getUserId()
		const submited = await sbHelper.sb
			.from('task_group')
			.insert({
        name,
        description,
				user_id: userId
      })
			.select();
		console.log("submitted:", submited);
    

		throw redirect(303, '/w2/group');
	}
};
