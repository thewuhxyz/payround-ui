import type * as anchor from '@project-serum/anchor';
import type { PublicKey } from '@solana/web3.js';
import type BN from 'bn.js';

export type ScheduleOptions = {
	freq: string;
	skippable: boolean;
};

export type TaskOptions = {
	amount: BN | null;
	scheduleOptions: ClockworkTrigger | null;
};

// // clockwork trigger I am interested in
export interface ClockworkTrigger {
	cron?: { schedule: string; skippable: boolean };
	epoch?: { epoch: BN };
	now?: {};
	slot?: { slot: BN };
	account?: { address: PublicKey; offset: BN; size: BN };
}

export type TaskStatus = { notstarted: {} } | { started: {} } | { paused: {} } | { ended: {} };

// export interface TaskStatus {
// 	notstarted?: {}
// 	started?: {}
// 	paused?: {}
// 	ended?: {}
// }
