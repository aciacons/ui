export default function wwwPageMock(userId = null) {
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
		// Tried adding this in here to get the user's balance data
		My: () => ({
			UserAccount: () => ({
				balance: 40
			})
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
			id: userId,
			balance: 0
		}),
		UserSession: (parent, args) => ({
			sessionKey: args.sessionKey,
			data: '',
		}),
	};
}
