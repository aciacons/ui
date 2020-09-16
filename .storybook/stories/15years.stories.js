import Vue from 'vue'
import StoryRouter from 'storybook-vue-router';

// import plugins
import kivaPlugins from '@/plugins';
Vue.use(kivaPlugins)

import AppealBanner15 from '@/components/WwwFrame/PromotionalBanner/Banners/AppealBanner/AppealBanner15';
import FifteenYears from '@/pages/15Years/15Years';
import FifteenYearsHeader from '@/components/15Years/15YearsHeader';
import FifteenYearsHowKivaWorks from '@/components/15Years/15YearsHowKivaWorks';
import FifteenYearsIndividuals from '@/components/15Years/15YearsIndividuals';
import FifteenYearsSponsors from '@/components/15Years/15YearsSponsors';
import FifteenYearsStyles from '@/components/15Years/15YearsStyles';
import FifteenYearsTimeline from '@/components/15Years/15YearsTimeline';

import apolloStoryMixin from '../mixins/apollo-story-mixin';
import kvAuth0StoryMixin from '../mixins/kv-auth0-story-mixin';

// This decorator applies the 15 year styles to the individual components in storybook
// so they can be viewed in the same way they're applied in the 15Year page.
const FifteenYearsDecorator = () => ({
	components: {
		FifteenYearsStyles
	},
	template: '<fifteen-years-styles><story/></fifteen-years-styles>',
});

export default {
	title: 'Pages/15Years',
	component: FifteenYears,
	args: {},
	argTypes: {},
	layout: 'fullscreen',
	decorators: [StoryRouter()]
};

export const Combined = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		FifteenYears,
	},
	layout: 'fullscreen',
	mixins: [apolloStoryMixin(), kvAuth0StoryMixin],
	template: `
		<div style="margin: -1rem;"><fifteen-years /></div>
	`,
});

export const AppealBanner = (args, { argTypes }) => ({
	components: {
		AppealBanner15
	},
	props: Object.keys(argTypes),
	mixins: [apolloStoryMixin, kvAuth0StoryMixin],
	template: `
		<appeal-banner-15 :appeal-banner-content="{}" />
	`,
});
AppealBanner.decorators = [FifteenYearsDecorator];

export const Header = (args, { argTypes }) => ({
	components: {
		FifteenYearsHeader
	},
	props: Object.keys(argTypes),
	mixins: [apolloStoryMixin(), kvAuth0StoryMixin],
	template: `
		<fifteen-years-header />
	`,
});
Header.decorators = [FifteenYearsDecorator];

export const Timeline = (args, { argTypes }) => ({
	components: {
		FifteenYearsTimeline
	},
	props: Object.keys(argTypes),
	mixins: [apolloStoryMixin(), kvAuth0StoryMixin],
	template: `
		<fifteen-years-timeline />
	`,
});
Timeline.decorators = [FifteenYearsDecorator];

export const Individuals = (args, { argTypes }) => ({
	components: {
		FifteenYearsIndividuals
	},
	props: Object.keys(argTypes),
	mixins: [apolloStoryMixin(), kvAuth0StoryMixin],
	decorators: [FifteenYearsDecorator],
	template: `
		<fifteen-years-individuals />
	`,
});
Individuals.decorators = [FifteenYearsDecorator];

export const Sponsors = (args, { argTypes }) => ({
	components: {
		FifteenYearsSponsors
	},
	props: Object.keys(argTypes),
	mixins: [apolloStoryMixin(), kvAuth0StoryMixin],
	decorators: [FifteenYearsDecorator],
	template: `
		<fifteen-years-sponsors />
	`,
});
Sponsors.decorators = [FifteenYearsDecorator];

export const HowKivaWorks = (args, { argTypes }) => ({
	components: {
		FifteenYearsHowKivaWorks
	},
	props: Object.keys(argTypes),
	mixins: [apolloStoryMixin(), kvAuth0StoryMixin],
	decorators: [FifteenYearsDecorator],
	template: `
		<fifteen-years-how-kiva-works />
	`,
});
HowKivaWorks.decorators = [FifteenYearsDecorator];
