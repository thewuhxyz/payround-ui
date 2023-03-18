import { PublicKey } from '@solana/web3.js';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	console.log('task deleted');

	const session = await locals.getSession();
	const supabase = locals.sbAdmin;
	const payroundAdmin = locals.payroundAdmin;

	const req = await request.json();
	const userId = req.address as string;
	const taskkey = req.taskkey as string;
	// if (!session) {
	// 	throw redirect(303, '/');
	// }
	// const user = session.user;
	// const userId = (await supabase.sb.from('account').select('user_id').eq('id', user.id).single())
	// 	.data?.user_id;

	// console.log('user id:', userId);
	// console.log('param:', params.id);

	// if (!userId) {
	// 	throw error(404, 'page not found');
	// }

	const taskPubkey = new PublicKey(taskkey);

	try {
		const tx = await payroundAdmin(userId).deleteTaskTx(taskPubkey);
		console.log('tx:', tx);
	} catch (e: any) {
		console.log(e);
	}

	const taskResult = await supabase.sb.from('task').delete().match({ task_key: taskkey}).select();
	const task = taskResult.data;

	console.log('task:', task);

	return new Response (JSON.stringify({success: true}));
};
