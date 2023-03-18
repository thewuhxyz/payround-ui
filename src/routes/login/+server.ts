import { SUPABASE_JWT_SECRET } from '$env/static/private';
import { SigninMessage } from '$lib/login';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import type { RequestHandler } from './$types';
//@ts-ignore
import * as jwt from 'jsonwebtoken';

export const POST: RequestHandler = async ({ locals, request, cookies, fetch }) => {
	const sbHelper = locals.sbHelper;
	const sbAdmin = locals.sbAdmin;
	const resp = await request.json();
	console.log('res:', resp);
	// throw redirect
	console.log('res:', JSON.parse(resp.message));
	console.log('res:', resp.signature);

	const message = JSON.parse(resp.message);
	console.log('message:', message);

	const userAddress = message.publicKey;

	const signinMessage = new SigninMessage(message);
	console.log('sign in message:', signinMessage);

	const some = await signinMessage.validate(resp.signature);

	console.log('some:', some);

	// const signJwt = (userAuthId: string, address: string, expiresIn = 120) => {
	// 	return jwt.sign(
	// 		{
	// 			address: address, // this will be read by RLS policy
	// 			sub: userAuthId,
	// 			aud: 'authenticated'
	// 		},
	// 		SUPABASE_JWT_SECRET,
	// 		{ expiresIn }
	// 	);
	// };

	if (!some) {
		return new Response(JSON.stringify({ error: 'Failed signature' }));
	} else {
		const isUserCreated = await sbHelper.isAccountCreatedByAddress(userAddress);
		if (isUserCreated) {
      console.log("1");
      
			const token = await sbHelper.generateTokenForByAddress(userAddress);
			cookies.set('AuthorizationToken', `Bearer ${token}`, {
				httpOnly: true,

				path: '/',

				secure: false,

				sameSite: 'strict',

				maxAge: 60 * 60 * 24 // 1 day
			});

			throw redirect(303, '/w3/dashboard');
		} else if (isUserCreated == false) {
      const token = await sbHelper.generateTokenForByAddress(userAddress);
      console.log("2")
      cookies.set('AuthorizationToken', `Bearer ${token}`, {
				httpOnly: true,

				path: '/',

				secure: false,

				sameSite: 'strict',

				maxAge: 60 * 60 * 24 // 1 day
			});
			throw redirect(303, '/w3/create');
		} else {
      console.log("3");
      
      console.log("user address:", userAddress)
			// const { data: user, error: err } = await sbAdmin.sb.auth.admin.createUser({ user_metadata: userAddress, email: "someone@example.com"});
			const { data: user, error: err } = await sbAdmin.sb.auth.admin.createUser({email: "someone2@example.com", user_metadata: {address: userAddress}});
      console.log("error:", err)
			if (!user.user) {
				throw error(404, 'error creating user');
			}

			const userAccount = await sbHelper.sb
				.from('account')
				.insert({
					degen: true,
					user_id: message.publicKey,
					account_created: false,
					id: user.user.id
				})
				.select();

			console.log('user:', userAccount);
      const token = await sbHelper.generateTokenForByAddress(userAddress);
      cookies.set('AuthorizationToken', `Bearer ${token}`, {
				httpOnly: false,

				path: '/w3',

				secure: false,

				sameSite: 'strict',

				maxAge: 60 * 60 * 24 // 1 day
			});
      throw redirect(303, '/w3/create');
		}
	}

};
