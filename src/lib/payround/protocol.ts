import * as anchor from "@project-serum/anchor"
import idl from "$lib/idl/payround.json"
import type {Payround} from "$lib/idl/payround"
import { Keypair, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction } from "@solana/web3.js"
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {CLOCKWORK_THREAD_PROGRAM_ID} from "@clockwork-xyz/sdk"

export class PayroundClient {
	static PAYROUND_ID = new PublicKey('BQpMmaGZ9wgYvUQGcBarTr3puuDid1W3tUj7Fz3pWUkV');
	static PAYROUND_SEED = 'payround';
	static MOCK_USDC_MINT = new PublicKey('48JBvpStoDYJmQBFuENcCm6dBomPC2z9r4SfJJa9ui9H');

	connection: anchor.web3.Connection;
	userId: PublicKey;

	constructor(
		public program: anchor.Program<Payround>,
		public provider: anchor.Provider,
		public network: string,
		userId?: string
	) {
		this.connection = program.provider.connection;
		this.userId = userId ? new PublicKey(userId) : this.provider.publicKey!;
	}

	static async connect(
		provider: anchor.Provider,
		network: string,
		userId?: string
	): Promise<PayroundClient> {
		const program = new anchor.Program<Payround>(idl as any, PayroundClient.PAYROUND_ID, provider);
		return new PayroundClient(program, provider, network, userId);
	}

	static getTokenAddress(mint: PublicKey, owner: PublicKey, allowPda?: boolean) {
		return getAssociatedTokenAddressSync(mint, owner, allowPda);
	}

	async createAccountTx(desc: string): Promise<string> {
		const group = Keypair.generate();
		console.log('group key:', group.publicKey.toBase58());
		const tasklist = Keypair.generate();
		console.log('tasklist key:', tasklist.publicKey.toBase58());

		const tx = await this.program.methods
			.createDegenAccount(this.bump, desc)
			.accounts({
				associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
				authority: this.provider.publicKey,
				payer: this.provider.publicKey,
				defaultGroup: group.publicKey,
				payroundAccount: this.pubkey,
				systemProgram: SystemProgram.programId,
				tasklist: tasklist.publicKey,
				tokenMint: PayroundClient.MOCK_USDC_MINT,
				tokenProgram: TOKEN_PROGRAM_ID,
				usdcTokenAccount: this.usdcAddress
			})
			.preInstructions([await this.program.account.tasklist.createInstruction(tasklist)])
			.signers([tasklist, group])
			.rpc();

		return tx;
	}

	async createEmailAccountTx(desc: string): Promise<string> {
		const userId = Keypair.generate().publicKey;
		console.log('userId:', userId.toBase58());
		const group = Keypair.generate();
		console.log('group key:', group.publicKey.toBase58());
		const tasklist = Keypair.generate();
		console.log('tasklist key:', tasklist.publicKey.toBase58());
		const tx = await this.program.methods
			.createEmailAccount(this.bump, desc)
			.accounts({
				associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
				authority: this.provider.publicKey,
				defaultGroup: group.publicKey,
				emailAccount: this.pubkey,
				payer: this.provider.publicKey,
				systemProgram: SystemProgram.programId,
				tasklist: tasklist.publicKey,
				tokenMint: PayroundClient.MOCK_USDC_MINT,
				tokenProgram: TOKEN_PROGRAM_ID,
				usdcTokenAccount: this.usdcAddress,
				userId: userId
			})
			.preInstructions([await this.program.account.tasklist.createInstruction(tasklist)])
			.signers([tasklist, group])
			.rpc();

		console.log('account created. tx:', tx);
		return userId.toBase58();
	}

	async createTaskTx(
		recipient: PublicKey,
		amount: number,
		label: string,
		desc: string,
		task: PublicKey,
		group: PublicKey
	): Promise<string> {
		const groupAccount = await this.fetchTaskGroupAccount(group);
		const tx = await this.program.methods
			.createTask(new anchor.BN(amount), label, desc)
			.accounts({
				authority: this.provider.publicKey,
				payer: this.provider.publicKey,
				payroundAccount: this.pubkey,
				recipient: recipient,
				systemProgram: SystemProgram.programId,
				task: task,
				taskGroup: group,
				tasklist: groupAccount.tasklist
			})
			.rpc();

		return tx;
	}

	async createGroupTx(desc: string): Promise<string> {
		const group = Keypair.generate();
		console.log('group key:', group.publicKey.toBase58());
		const tasklist = Keypair.generate();
		console.log('tasklist key:', tasklist.publicKey.toBase58());

		return await this.program.methods
			.createTaskGroup(desc)
			.accounts({
				authority: this.provider.publicKey,
				payer: this.provider.publicKey,
				payroundAccount: this.pubkey,
				systemProgram: SystemProgram.programId,
				taskGroup: group.publicKey,
				tasklist: tasklist.publicKey
			})
			.preInstructions([await this.program.account.tasklist.createInstruction(tasklist)])
			.signers([tasklist, group])
			.rpc();
	}

	async changeTaskGroupTx(taskKey: PublicKey, newGroupkey: PublicKey): Promise<string> {
		const task = await this.fetchTaskAccount(taskKey);
		const currentTaskGroup = await this.fetchTaskGroupAccount(task.taskGroup);
		const newGroupAccount = await this.fetchTaskGroupAccount(newGroupkey);
		return await this.program.methods
			.changeTaskGroup()
			.accounts({
				authority: this.provider.publicKey,
				currentGroupTasklist: currentTaskGroup.tasklist,
				currentTaskGroup: currentTaskGroup.pubkey,
				newGroupTasklist: newGroupAccount.tasklist,
				newTaskGroup: newGroupAccount.pubkey,
				payer: this.provider.publicKey,
				payroundAccount: this.pubkey,
				recipientAta: this.pubkey,
				systemProgram: SystemProgram.programId,
				task: taskKey
			})
			.rpc();
	}

	async startTaskTx(task: PublicKey, schedule: string, skippable: boolean): Promise<string> {
		const taskAccount = await this.fetchTaskAccount(task);
		console.log('recipient:', taskAccount.recipient.toBase58());
		console.log('recipient token address:', taskAccount.recipient.toBase58());

		return await this.program.methods
			.startTask(schedule, skippable)
			.accounts({
				accountAta: this.usdcAddress,
				associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
				authority: this.provider.publicKey,
				clockworkProgram: CLOCKWORK_THREAD_PROGRAM_ID,
				payer: this.provider.publicKey,
				payroundAccount: this.pubkey,
				recipient: taskAccount.recipient,
				recipientAta: this.getUsdcAddressFor(taskAccount.recipient),
				rent: SYSVAR_RENT_PUBKEY,
				systemProgram: SystemProgram.programId,
				task: task,
				thread: taskAccount.thread,
				tokenProgram: TOKEN_PROGRAM_ID
			})
			.rpc();
	}

  async pauseTaskTx(task:PublicKey) {
    const taskAccount = await this.fetchTaskAccount(task);
		return await this.program.methods
			.pauseTask()
			.accounts({
				authority: this.provider.publicKey,
				clockworkProgram: CLOCKWORK_THREAD_PROGRAM_ID,
				payer: this.provider.publicKey,
				payroundAccount: this.pubkey,
				task: taskAccount.pubkey,
				thread: taskAccount.thread,
			})
			.rpc();
  }
  
  async resumeTaskTx(task:PublicKey) {
    const taskAccount = await this.fetchTaskAccount(task);
		return await this.program.methods
			.resumeTask()
			.accounts({
				authority: this.provider.publicKey,
				clockworkProgram: CLOCKWORK_THREAD_PROGRAM_ID,
				payer: this.provider.publicKey,
				payroundAccount: this.pubkey,
				task: taskAccount.pubkey,
				thread: taskAccount.thread,
			})
			.rpc();
  }

	async endTaskTx(task: PublicKey): Promise<string> {
		const taskAccount = await this.fetchTaskAccount(task);
		return await this.program.methods
			.endTask()
			.accounts({
				authority: this.provider.publicKey,
				clockworkProgram: CLOCKWORK_THREAD_PROGRAM_ID,
				payer: this.provider.publicKey,
				payroundAccount: this.pubkey,
				task: taskAccount.pubkey,
				thread: taskAccount.thread,
			})
			.rpc();
	}
	
  async deleteTaskTx(task: PublicKey): Promise<string> {
		const taskAccount = await this.fetchTaskAccount(task);
		const taskGroup = await this.fetchTaskGroupAccount(taskAccount.taskGroup);
		return await this.program.methods
			.deleteTask()
			.accounts({
				authority: this.provider.publicKey,
				clockworkProgram: CLOCKWORK_THREAD_PROGRAM_ID,
				payroundAccount: this.pubkey,
				task: taskAccount.pubkey,
				thread: taskAccount.thread,
        payTo: this.provider.publicKey,
        taskGroup: taskGroup.pubkey,
        tasklist: taskGroup.tasklist
			})
			.rpc();
	}

	async creditTaskTx(task: PublicKey, amount: number): Promise<string> {
		const taskAccount = await this.fetchTaskAccount(task);
		return await this.program.methods
			.creditTask(new anchor.BN(amount))
			.accounts({
				authority: this.provider.publicKey,
				payer: this.provider.publicKey,
				payroundAccount: this.pubkey,
				systemProgram: SystemProgram.programId,
				task: taskAccount.pubkey,
				thread: taskAccount.thread
			})
			.rpc();
	}

	async withdrawTaskCreditTx(taskKey: PublicKey, amount: number) {
		const task = await this.fetchTaskAccount(taskKey);
		return await this.program.methods
			.withdrawTaskCredit(new anchor.BN(amount))
			.accounts({
				authority: this.provider.publicKey,
				clockworkProgram: CLOCKWORK_THREAD_PROGRAM_ID,
				payroundAccount: this.pubkey,
				payTo: this.provider.publicKey,
				task: task.pubkey,
				thread: task.thread
			})
			.rpc();
	}

  async updateTaskAcount(task: PublicKey, amount: number) {
    return await this.program.methods.updateTaskAmount(new anchor.BN(amount))
    .accounts({
      authority: this.provider.publicKey,
      payroundAccount: this.pubkey,
      systemProgram: SystemProgram.programId,
      task: task
    }).rpc()
  }
  
  async updateTaskSchedule(task: PublicKey, schedule: string, skippable: boolean) {
    const taskAccount = await this.fetchTaskAccount(task);
    return await this.program.methods.updateTaskSchedule(schedule, skippable)
    .accounts({
      authority: this.provider.publicKey,
      payroundAccount: this.pubkey,
      accountAta: this.usdcAddress,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      clockworkProgram: CLOCKWORK_THREAD_PROGRAM_ID,
      payer: this.provider.publicKey,
      recipientAta: this.usdcAddress,
      rent: SYSVAR_RENT_PUBKEY,
      task: taskAccount.pubkey,
      thread:taskAccount.thread,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    }).rpc()
  }

  // todo: close account

	get usdcAddress() {
		return this.getUsdcAddressFor(this.pubkey);
	}

	get pubkey() {
		return this._pda(this.userId)[0];
	}

	get bump() {
		return this._pda(this.userId)[1];
	}

	private _pda(userId: PublicKey) {
		return findProgramAddressSync(
			[userId.toBuffer(), Buffer.from(PayroundClient.PAYROUND_SEED)],
			this.program.programId
		);
	}

	getUsdcAddressFor(owner: PublicKey) {
		return PayroundClient.getTokenAddress(PayroundClient.MOCK_USDC_MINT, owner, true);
	}

	async fetchPayroundAccount(userId: PublicKey) {
		return await this.program.account.payroundAccount.fetch(this.pubkey);
	}

	async fetchTaskAccount(key: PublicKey) {
		return await this.program.account.task.fetch(key);
	}

	async fetchTaskGroupAccount(key: PublicKey) {
		return await this.program.account.taskGroup.fetch(key);
	}

	async fetchTaskListAccount(key: PublicKey) {
		return await this.program.account.tasklist.fetch(key);
	}
}