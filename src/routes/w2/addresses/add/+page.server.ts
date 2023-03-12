import { goto } from '$app/navigation';
import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	add: async ({ request, locals }) => {
		const supabase = locals.supabase;
		const session = await locals.getSession();
		// const payroundAdmin = locals.payroundAdmin;

		if (!session) {
			throw redirect(303, '/');
		}

		const formData = Object.fromEntries(await request.formData());
		console.log('forndata:', formData);

		const name = formData.name as string;
		const address = formData.address as string;

		const user = session.user;
		const submited = await supabase
			.from('address_book')
			.insert({
				account_id: user.id,
				name,
        address,
			})
			.select();
		console.log('submitted:', submited);

		throw redirect(303, '/w2/dashboard');
	}
};
