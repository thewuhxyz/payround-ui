export type Payround = {
  "version": "0.1.0",
  "name": "payround",
  "instructions": [
    {
      "name": "createEmailAccount",
      "accounts": [
        {
          "name": "emailAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "defaultGroup",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tasklist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "usdcTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "desc",
          "type": "string"
        }
      ]
    },
    {
      "name": "createDegenAccount",
      "accounts": [
        {
          "name": "payroundAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "usdcTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "defaultGroup",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tasklist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "desc",
          "type": "string"
        }
      ]
    },
    {
      "name": "closePayroundAccount",
      "accounts": [
        {
          "name": "payroundAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "usdcTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createTask",
      "accounts": [
        {
          "name": "task",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "taskGroup",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tasklist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "recipient",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "label",
          "type": "string"
        },
        {
          "name": "desc",
          "type": "string"
        }
      ]
    },
    {
      "name": "createTaskGroup",
      "accounts": [
        {
          "name": "taskGroup",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payroundAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tasklist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "desc",
          "type": "string"
        }
      ]
    },
    {
      "name": "processTask",
      "accounts": [
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "accountAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recipientAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [],
      "returns": {
        "defined": "ThreadResponse"
      }
    },
    {
      "name": "processTaskTestIx",
      "accounts": [
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "threadAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "accountAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipientAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "startTask",
      "accounts": [
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Clockwork Program (Thread Program)"
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        },
        {
          "name": "accountAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recipientAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "schedule",
          "type": "string"
        },
        {
          "name": "skippable",
          "type": "bool"
        }
      ]
    },
    {
      "name": "pauseTask",
      "accounts": [
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Clockwork Program (Thread Program)"
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "resumeTask",
      "accounts": [
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Clockwork Program (Thread Program)"
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "endTask",
      "accounts": [
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Clockwork Program (Thread Program)"
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "deleteTask",
      "accounts": [
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Clockwork Program (Thread Program)"
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "taskGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tasklist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payTo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "updateTaskSchedule",
      "accounts": [
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Clockwork Program (Thread Program)"
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        },
        {
          "name": "accountAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipientAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "schedule",
          "type": "string"
        },
        {
          "name": "skippable",
          "type": "bool"
        }
      ]
    },
    {
      "name": "updateTaskAmount",
      "accounts": [
        {
          "name": "task",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawTaskCredit",
      "accounts": [
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Clockwork Program (Thread Program)"
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payTo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "creditTask",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "changeTaskGroup",
      "accounts": [
        {
          "name": "task",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentTaskGroup",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newTaskGroup",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "currentGroupTasklist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newGroupTasklist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "recipientAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "payroundAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "userId",
            "type": "publicKey"
          },
          {
            "name": "usdcTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "taskGroups",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "groupCount",
            "type": "u8"
          },
          {
            "name": "email",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "task",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "type": "publicKey"
          },
          {
            "name": "taskGroup",
            "type": "publicKey"
          },
          {
            "name": "account",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "recipient",
            "type": "publicKey"
          },
          {
            "name": "thread",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "label",
            "type": "string"
          },
          {
            "name": "desc",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "taskGroup",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "account",
            "type": "publicKey"
          },
          {
            "name": "desc",
            "type": "string"
          },
          {
            "name": "tasklist",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "tasklist",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "taskGroup",
            "type": "publicKey"
          },
          {
            "name": "lastTask",
            "type": "publicKey"
          },
          {
            "name": "count",
            "type": "u16"
          },
          {
            "name": "max",
            "type": "u16"
          },
          {
            "name": "list",
            "type": {
              "array": [
                "publicKey",
                1000
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "TaskStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "STARTED"
          },
          {
            "name": "PAUSED"
          },
          {
            "name": "ENDED"
          }
        ]
      }
    }
  ]
};

export const IDL: Payround = {
  "version": "0.1.0",
  "name": "payround",
  "instructions": [
    {
      "name": "createEmailAccount",
      "accounts": [
        {
          "name": "emailAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "userId",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "defaultGroup",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tasklist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "usdcTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "desc",
          "type": "string"
        }
      ]
    },
    {
      "name": "createDegenAccount",
      "accounts": [
        {
          "name": "payroundAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "usdcTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "defaultGroup",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tasklist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "desc",
          "type": "string"
        }
      ]
    },
    {
      "name": "closePayroundAccount",
      "accounts": [
        {
          "name": "payroundAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "usdcTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createTask",
      "accounts": [
        {
          "name": "task",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "taskGroup",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tasklist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "recipient",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "label",
          "type": "string"
        },
        {
          "name": "desc",
          "type": "string"
        }
      ]
    },
    {
      "name": "createTaskGroup",
      "accounts": [
        {
          "name": "taskGroup",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payroundAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tasklist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "desc",
          "type": "string"
        }
      ]
    },
    {
      "name": "processTask",
      "accounts": [
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "accountAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recipientAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [],
      "returns": {
        "defined": "ThreadResponse"
      }
    },
    {
      "name": "processTaskTestIx",
      "accounts": [
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "threadAuthority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "accountAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipientAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "startTask",
      "accounts": [
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Clockwork Program (Thread Program)"
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        },
        {
          "name": "accountAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "recipientAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "schedule",
          "type": "string"
        },
        {
          "name": "skippable",
          "type": "bool"
        }
      ]
    },
    {
      "name": "pauseTask",
      "accounts": [
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Clockwork Program (Thread Program)"
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "resumeTask",
      "accounts": [
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Clockwork Program (Thread Program)"
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "endTask",
      "accounts": [
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Clockwork Program (Thread Program)"
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "deleteTask",
      "accounts": [
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Clockwork Program (Thread Program)"
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "taskGroup",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tasklist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payTo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "updateTaskSchedule",
      "accounts": [
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Clockwork Program (Thread Program)"
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        },
        {
          "name": "accountAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipientAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "schedule",
          "type": "string"
        },
        {
          "name": "skippable",
          "type": "bool"
        }
      ]
    },
    {
      "name": "updateTaskAmount",
      "accounts": [
        {
          "name": "task",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawTaskCredit",
      "accounts": [
        {
          "name": "clockworkProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Clockwork Program (Thread Program)"
          ]
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payTo",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "creditTask",
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "task",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Who's paying"
          ]
        },
        {
          "name": "thread",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Address to assign to the newly created Thread"
          ]
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Thread Admin, not signer but it will be use to pseudo-sign by the driver program"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "changeTaskGroup",
      "accounts": [
        {
          "name": "task",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payroundAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "currentTaskGroup",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newTaskGroup",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "currentGroupTasklist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newGroupTasklist",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "recipientAta",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "payroundAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "userId",
            "type": "publicKey"
          },
          {
            "name": "usdcTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "taskGroups",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "groupCount",
            "type": "u8"
          },
          {
            "name": "email",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "task",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "type": "publicKey"
          },
          {
            "name": "taskGroup",
            "type": "publicKey"
          },
          {
            "name": "account",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "recipient",
            "type": "publicKey"
          },
          {
            "name": "thread",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "label",
            "type": "string"
          },
          {
            "name": "desc",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "taskGroup",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "account",
            "type": "publicKey"
          },
          {
            "name": "desc",
            "type": "string"
          },
          {
            "name": "tasklist",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "tasklist",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "taskGroup",
            "type": "publicKey"
          },
          {
            "name": "lastTask",
            "type": "publicKey"
          },
          {
            "name": "count",
            "type": "u16"
          },
          {
            "name": "max",
            "type": "u16"
          },
          {
            "name": "list",
            "type": {
              "array": [
                "publicKey",
                1000
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "TaskStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "STARTED"
          },
          {
            "name": "PAUSED"
          },
          {
            "name": "ENDED"
          }
        ]
      }
    }
  ]
};
