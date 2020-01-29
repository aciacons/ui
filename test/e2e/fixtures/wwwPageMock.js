export default function wwwPageMock() {
	return {
		AutoDeposit: () => ({
			isSubscriber: false
		}),
		Date: () => '',
		LatestDonationCampaign: () => ({
			amount_raised: 0,
			target_amount: 0,
		}),
		Manifest: () => ({
			hasFreeCredits: false,
		}),
		Setting: (parent, args) => ({
			key: args.key,
			value: '',
		}),
		Shop: () => ({
			lendingRewardOffered: false,
			nonTrivialItemCount: 0,
		}),
		ShopTotals: () => ({
			redemptionCodeAvailableTotal: '0.00',
		}),
		UserAccount: () => ({
			id: 42
		}),
		UserSession: (parent, args) => ({
			sessionKey: args.sessionKey,
			data: '',
		}),
	};
}
