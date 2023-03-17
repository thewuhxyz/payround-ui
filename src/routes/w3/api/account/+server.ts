import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const req = await request.json();
	const userId = req.address as string;
	const supabase = locals.sbAdmin;
	const payroundAdmin = locals.payroundAdmin;

	const isUserCreated = await supabase.isAccountCreatedByAddress(userId)
  const data = isUserCreated

	console.log("user data:", data);
  
		return new Response(JSON.stringify({ account: data}));
	}

