import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const sbHelper = locals.sbHelper
	const session = await sbHelper.getSession();
	// const supabase = locals.supabase;
	if (!session) {
		throw redirect(303, '/');
	}
	const user = session.user;
	
	const addressBookResult = await sbHelper.getAllAddressesForUser()
	if (addressBookResult == null) {
		throw redirect (303, "/") // no user
	}

	await parent()

	return {
		addresses: addressBookResult
	};
};
