import { PayroundClient } from '$lib/payround/protocol';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const session = await locals.getSession();
	const supabase = locals.supabase;
	const sbHelper = locals.sbHelper;
	if (!session) {
		console.log('here @ w2 layout');
		throw redirect(303, '/');
	}

	const accountCreated = await sbHelper.isAccountCreated();
	console.log('account created form w2:', accountCreated);

	if (!accountCreated) {
		return {
			balance: 0,
			userAccountKey: '',
			// balance: 0,
			credits: 0,
			uiBalance: 0,
			email: '',
			nickname: ''
		};
	}
	const user = session.user;
	// const result = await supabase.from('account').select('user_id, email, nickname, rent').eq('id', user.id).single();
	const result = await sbHelper.getUserAccount();
	const userId = result.user_id;
	const email = result.email;
	const nickname = result.nickname;
	const rent = result.rent!;
	console.log('user id:', userId);

	const payroundAdmin = locals.payroundAdmin(userId!);

	const userAccountKey = payroundAdmin.pubkey.toBase58();
	console.log('usdc account:', payroundAdmin.usdcAddress.toBase58());

	const balance = await payroundAdmin.connection.getTokenAccountBalance(payroundAdmin.usdcAddress);
	const credits =
		((await payroundAdmin.getPubkeyBalance()) - PayroundClient.ACCOUNT_RENT) / PayroundClient.MSOL; // MegaLamports
	const uiBalance = balance.value.uiAmount;
	return {
		session: locals.getSession(),
		userAccountKey,
		balance,
		credits,
		uiBalance,
		email,
		nickname
	};
};
