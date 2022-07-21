use my_first_on_chain_bin_plus_lib::process_instruction;
use solana_program::{account_info::AccountInfo, pubkey::Pubkey, stake_history::Epoch};
use std::env;

fn main() {
    println!("\nHello, world!\n");

    let args: Vec<String> = env::args().collect();

    let mut instruction_data = "not set".as_bytes();
    if args.len() > 1 {
        instruction_data = &args[1].as_bytes();
    }

    let mut account_data: u8 = 0;
    if args.len() > 2 {
        account_data = args[2].parse().unwrap();
    }
    let mut acct_data_array = [account_data];

    let program_id = Pubkey::default();

    let key = Pubkey::default();
    let mut lamports = 0;
    let owner = Pubkey::default();

    let account = AccountInfo::new(
        &key,
        false,
        false,
        &mut lamports,
        &mut acct_data_array,
        &owner,
        false,
        Epoch::default(),
    );
    let accounts = [account];
    let result = process_instruction(&program_id, &accounts, &instruction_data);
    println!("Result:{:?}", result);
}
