import KvIcon from '@/components/Kv/KvIcon';
import KvIconButton from '@/components/Kv/KvIconButton';

export default {
	title: 'KV/KvIconButton',
	component: KvIconButton,
};

export const Default = () => ({
	components: { KvIconButton, KvIcon },
	template: `
	<div>
		<p>
		 This component is a wrapper that creates a kv-button with icons on the left and/or right and a unique kvButton style.
		 IT SHOULD ONLY BE USED ON THE THANKS PAGE V2 EXPERIMENT
		 until site-wide button styling is finalized.
		</p>
		<kv-icon-button class="expanded">
			<template v-slot:icon-left>
				<kv-icon
					class="share-icon"
					name="share"
				/>
			</template>
			Button
			<template v-slot:icon-right>
				<kv-icon
					name="fat-chevron"
					:from-sprite="true"
				/>
			</template>
		</kv-icon-button>
		<kv-icon-button class="active expanded">
			<template v-slot:icon-left>
				<kv-icon
					class="share-icon"
					name="share"
				/>
			</template>
			Button
			<template v-slot:icon-right>
				<kv-icon
					name="fat-chevron"
					:from-sprite="true"
				/>
			</template>
		</kv-icon-button>
		<kv-icon-button class="expanded">
			<template v-slot:icon-left>
				<kv-icon
					name="alert-circle"
				/>
			</template>
			Button
			<template v-slot:icon-right>
				<kv-icon
					name="fat-chevron"
					:from-sprite="true"
				/>
			</template>
		</kv-icon-button>
		<kv-icon-button class="active expanded">
			<template v-slot:icon-left>
				<kv-icon
					name="alert-circle"
				/>
			</template>
			Button
			<template v-slot:icon-right>
				<kv-icon
					name="fat-chevron"
					:from-sprite="true"
				/>
			</template>
		</kv-icon-button>
		<kv-icon-button class="expanded">
			<template v-slot:icon-left>
				<kv-icon
					name="receipt-outline"
				/>
			</template>
			Button
			<template v-slot:icon-right>
				<kv-icon
					name="fat-chevron"
					:from-sprite="true"
				/>
			</template>
		</kv-icon-button>
		<kv-icon-button class="active expanded">
			<template v-slot:icon-left>
				<kv-icon
					name="receipt-outline"
				/>
			</template>
			Button
			<template v-slot:icon-right>
				<kv-icon
					name="fat-chevron"
					:from-sprite="true"
				/>
			</template>
		</kv-icon-button>
		<component is="style">
		// Icon sizes can be overwritten
		.share-icon {
			height: 1.15rem;
			width: 1.15rem;
		}
		</component>
	</div>
	`
});
