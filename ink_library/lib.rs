#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod ink_library {
    use ink::{
        prelude::vec::Vec,
        xcm::{latest::AssetTransferFilter, prelude::*},
    };
    use parity_scale_codec::Encode;

    #[ink(storage)]
    pub struct InkLibrary {}

    type Bytes = ink::sol::DynBytes;
    type Bytes32 = ink::sol::FixedBytes<32>;

    impl InkLibrary {
        /// Constructor that initializes the `bool` value to the given `init_value`.
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {}
        }

        #[ink(message)]
        pub fn teleport(&self, para_id: u32, beneficiary: Bytes32, amount: u128) -> Bytes {
            let destination = Location::new(1, [Parachain(para_id)]);
            let remote_fees =
                AssetTransferFilter::Teleport(Definite((Parent, amount.saturating_div(10)).into()));
            let preserve_origin = false;
            let mut transfer_assets = Vec::new();
            transfer_assets.push(AssetTransferFilter::Teleport(Wild(AllCounted(1))));
            let remote_xcm = Xcm::<()>::builder_unsafe()
                .deposit_asset(AllCounted(1), *beneficiary)
                .build();
            let xcm = Xcm::<()>::builder()
                .withdraw_asset((Parent, amount))
                .pay_fees((Parent, amount.saturating_div(10)))
                .initiate_transfer(
                    destination,
                    remote_fees,
                    preserve_origin,
                    transfer_assets,
                    remote_xcm
                )
                .build();
            let versioned = VersionedXcm::from(xcm);
            ink::sol::DynBytes(versioned.encode())
        }
    }
}
