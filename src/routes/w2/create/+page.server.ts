import { goto } from '$app/navigation';
import { createCustomStripeAccount } from '$lib/server/stripe';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({parent}) => {
	await parent()
}

export const actions: Actions = {
	createaccount: async ({ request, locals }) => {
		const supabase = locals.supabase;
		const session = await locals.getSession();
		const payroundAdmin = locals.payroundAdmin;
		const sbHelper = locals.sbHelper;

		if (!session) {
			throw redirect(303, '/');
		}

		const user = session.user;
		const isUserCreated = await sbHelper.isAccountCreated();

		// if (isUserCreated == null || isUserCreated.account_created == null || !isUserCreated) {
		if (isUserCreated == null || !isUserCreated) {
			const formData = Object.fromEntries(await request.formData());
			console.log('forndata:', formData);

			const name = formData.name as string;

			const payroundAd = payroundAdmin().provider.publicKey;
			const userId = await payroundAdmin().createEmailAccountTx();
			console.log('payround admin', payroundAd?.toBase58());

			// const rent = await payroundAdmin(userId).getPubkeyBalance()

			let stripeId;

			if (user.email) {
				const stripeAccount = await createCustomStripeAccount(user.email);
				stripeId = stripeAccount.id;
				console.log('stripe id:', stripeId);
			}

			const some = await sbHelper.sb
				.from('account')
				.insert({
					id: user.id,
					degen: false,
					user_id: userId,
					account_key: payroundAdmin(userId).pubkey.toBase58(),
					account_created: true,
					email: user.email,
					nickname: name,
					stripe_id: stripeId,
					// rent
				})
				.select();
			console.log('some:', some);

		}

		throw redirect(303, '/w2/dashboard');
	}
};
