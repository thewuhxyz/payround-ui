import { SUPABASE_JWT_SECRET } from '$env/static/private';
import type { Database } from '$lib/types/supabase';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { error, redirect } from '@sveltejs/kit';
//@ts-ignore
import * as jwt from "jsonwebtoken"

export class SupabaseHelper {
	// user: Session["user"]
	constructor(public sb: SupabaseClient<Database>) {}

	async getSession() {
		const {
			data: { session }
		} = await this.sb.auth.getSession();
		return session;
	}

	async getUser() {
		const session = await this.getSession();
		if (!session) throw redirect(303, '/');
		return session.user;
	}

	async getAllTasksForUser() {
		const user = await this.getUser();
		console.log("user at all taks:", user.id);
		
		if (!user) throw redirect(303, '/');
		const userId = await this.getUserId()
		const tasks = await this.sb.from('task').select('*').eq('user_id', userId);
		console.log("task:", tasks);
		
		if (tasks.error) throw error(404, 'error fetching tasks');
		return tasks.data;
	}

	async getAllTasksForGroup(groupId: string) {
		const userId = await this.getUserId();
		if (!userId) throw redirect(303, '/');
		const tasks = await this.sb
			.from('task')
			.select('*')
			.eq('task_group', groupId)
			.eq('user_id', userId);
		if (tasks.error) throw error(404, 'error fetching tasks');
		return tasks.data;
	}

	async getAllTaskGroupForUser() {
		const user = await this.getUser();
		if (!user) throw redirect(303, '/');
		const userId = await this.getUserId();
		const data = await this.sb.from('task_group').select('*').eq('user_id', userId);
		if (data.error) throw error(404, 'error fetching task group');
		return data.data;
	}

	async getAllAddressesForUser() {
		const user = await this.getUserId();
		if (!user) throw redirect(303, '/');
		const addressesData = await this.sb.from('address_book').select('*').eq('user_id', user);		
		if (addressesData.error) throw error(404, 'Error fetching Addresses');
		return addressesData.data;
	}

	async getUserAccount() {
		const user = await this.getUserId();
		if (!user) throw redirect(303, '/');
		const userData = await this.sb.from('account').select('*').eq('user_id', user).single();
		if (userData.error) throw error(404, 'error fetching user account');
		return userData.data;
	}

	async getTask(taskkey: string) {
		const user = await this.getUserId();
		if (!user) throw redirect(303, '/');
		const data = await this.sb
			.from('task')
			.select('*')
			.eq('task_key', taskkey)
			.eq('user_id', user)
			.single();
		if (data.error) throw error(404, 'error fetching task');
		return data.data;
	}

	async getTaskGroup(groupId: string) {
		const user = await this.getUserId();
		if (!user) throw redirect(303, '/');
		const data = await this.sb
			.from('task_group')
			.select('*')
			.eq('id', groupId)
			.eq('user_id', user)
			.single();
		if (data.error) throw error(404, 'Error fetching group');
		return data.data;
	}

	async getAddressNameByAddress(address: string) {
		const user = await this.getUserId();
		if (!user) throw redirect(303, '/');
		const data = await this.sb
			.from('address_book')
			.select('name')
			.eq('address', address)
			.eq('user_id', user)
			.single();
		if (data.error) throw error(404, 'error fetching address');
		return data.data;
	}

	async getAccountByEmail(email: string) {
		const user = await this.getUserId();
		if (!user) throw redirect(303, '/');
		const data = await this.sb.from('account').select('*').eq('email', email).single();
		if (data.error) throw error(404, data.error);
		return data.data;
	}

	async isAccountCreated() {
		// const session = await this.getSession();
		// if (session == null) return null
		const user = await this.getUser()
		// const user = session.user
		const data = await this.sb.from('account').select('account_created').eq('id', user.id).single();
		if (data.error) {
			if (data.error.code == 'PGRST116') {
				return false
			}
			throw error(404, data.error.code);
		} 
		// if (!data.data.account_created) throw redirect (303,"/w2/create")
		return data.data.account_created;
	}
	
	async isAccountCreatedByAddress(address: string) {
		// const session = await this.getSession();
		// if (session == null) return null 
		// const user = session.user
		const data = await this.sb.from('account').select('account_created').eq('user_id', address).single();
		if (data.error) {
			if (data.error.code == 'PGRST116') {
				return false;
			}
			throw error(404, data.error.code);
		}
		// if (!data.data.account_created) throw redirect (303,"/w2/create")
		return data.data.account_created;
	}
	
	async generateTokenForByAddress(address: string) {
		const data = await this.sb.from('account').select('user_id, id').eq('user_id', address).single();
		if (data.error) throw error(404, 'error fetching info');
		return this.signJwt(data.data.id!, data.data.user_id!)
	}

	async getUserId() {
		const user = await this.getUser();
		if (!user) throw redirect(303, '/');
		const userData = await this.sb.from('account').select('user_id').eq('id', user.id).single();
		if (userData.error) throw error(404, 'error fetching user');
		if (!userData.data.user_id) throw error(404, 'error fetching user');
		return userData.data.user_id;
	}

	async deleteTask(taskkey: string) {
		const user = await this.getUserId();
		const data = await this.sb
			.from('task')
			.delete()
			.match({ task_key: taskkey })
			.eq('user_id', user)
			.select();
		if (data.error) throw error(500, 'error deleting data');
		return data.data;
	}

	signJwt = (userAuthId: string, address: string, expiresIn = 120) => {
		return jwt.sign(
			{
				address: address, // this will be read by RLS policy
				sub: userAuthId,
				aud: 'authenticated'
			},
			SUPABASE_JWT_SECRET,
			{ expiresIn }
		);
	};
}