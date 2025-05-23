import { ArrowRight, CheckIcon, PenTool } from "lucide-react"
import { Button } from "../ui/button"
import { HoverBorderGradient } from "../ui/hover-border-gradient"
import React from "react";

const tiers = [
    {
        name: 'MayTrade',
        id: 'tier-hobby',
        href: '#',
        priceMonthly: 'Free',
        description: "The perfect plan if you're just getting started with our product.",
        features: ['Academy Fundamental Lessons', 'Risk calculator, News, Journal', 'Competitions', 'Events'],
        featured: false,
    },
    {
        name: 'MayTrade Pro',
        id: 'tier-enterprise',
        href: '#',
        priceMonthly: '$15',
        description: 'Dedicated support and infrastructure for your company.',
        features: [
            'MayKit',
            'Dashboard',
            'Academy',
            'Maychat',
            'Systemical',
            '1 on 1 Mentoring',
        ],
        featured: true,
    },
    {
        name: 'Maytrade Set',
        id: 'tier-enterprise-new',
        href: '#',
        priceMonthly: '$105',
        description: 'Dedicated support and infrastructure for your company.',
        features: [
            'Dashboard',
            'Maykit',
            'Academy',
            'Maychat',

        ],
        featured: false,
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function PricingMainSection() {
    return (
        <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">

            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
                <p className="text-4xl md:text-6xl font-bold h-16  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-blue-200 bg-opacity-50">
                    Choose the right plan for you
                </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-neutral-300 sm:text-xl/8">
                Choose an affordable plan that’s packed with the best features for bla bla, customize your plans by the selecting the feature in the cards below.
            </p>
            <div className="mx-auto mt-16 grid gap-4 max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-[1366px] lg:grid-cols-3">
                {tiers.map((tier, tierIdx, tiers) => (
                    <div>
                        {tierIdx == 1 && <div className="w-[calc(100%-50px)] mx-auto rounded-t-lg bg-indigo-500/50 text-center py-1.5">Most Popular</div>}
                        <div
                            key={tier.id}
                            className={classNames(
                                tier.featured ? 'border relative bg-neutral-950/50 backdrop-blur-lg shadow-2xl' : 'bg-neutral-900/50 backdrop-blur-lg sm:mx-8 lg:mx-0',
                                tier.featured
                                    ? ''
                                    : tierIdx === 0
                                        ? ''
                                        : '',
                                'rounded-xl p-8 ring-1 ring-gray-900/10 sm:p-10',
                            )}
                        >
                            <div className="flex w-full justify-between items-center">
                                <h3
                                    id={tier.id}
                                    className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'text-base/7 font-semibold')}
                                >
                                    {tier.name}
                                </h3>
                                {tierIdx == 1 && <div className="bg-neutral-950 border px-5 py-1 rounded-full text-sm">Payment Plan</div>}
                                {tierIdx == 2 && <div className="bg-gradient-to-tr from-blue-700 to-purple-600 px-3 py-1 rounded-full text-sm">30% OFF</div>}
                            </div>


                            <p className="mt-4 flex items-baseline gap-x-2">
                                <div className="flex items-baseline gap-x-2">
                                    <span
                                        className={classNames(
                                            tier.featured ? 'text-white' : 'text-neutral-200',
                                            'text-5xl font-semibold tracking-tight',
                                        )}
                                    >
                                        {tier.priceMonthly}
                                    </span>
                                    <span className={classNames(tier.featured ? 'text-gray-400' : 'text-neutral-300', 'text-base')}>/month</span>
                                </div>

                            </p>
                            <Button className="w-full mt-8">Get Started</Button>
                            <p className={classNames(tier.featured ? 'text-gray-300' : 'text-neutral-400', 'mt-6 text-base/7')}>
                                {tier.description}
                            </p>
                            {
                                tier.featured ? <ul className="flex flex-col gap-2 mt-10">
                                    <HoverBorderGradient
                                        containerClassName="rounded-md w-full"
                                        as="button"

                                        className="text-base   justify-between text-white flex w-full "
                                    >
                                        <div className="flex items-center gap-1">
                                            <PenTool className="size-5" />
                                            <span className="text-sm">Maykit</span>
                                        </div>
                                        <div className="px-3 py-1 rounded-full border">+$15</div>
                                    </HoverBorderGradient>
                                    <HoverBorderGradient
                                        containerClassName="rounded-md w-full"
                                        as="button"

                                        className="text-base   justify-between text-white flex w-full "
                                    >
                                        <div className="flex items-center gap-1">
                                            <PenTool className="size-5" />
                                            <span className="text-sm">Maykit</span>
                                        </div>
                                        <div className="px-3 py-1 rounded-full border">+$15</div>
                                    </HoverBorderGradient>
                                    <HoverBorderGradient
                                        containerClassName="rounded-md w-full"
                                        as="button"

                                        className="text-base   justify-between text-white flex w-full "
                                    >
                                        <div className="flex items-center gap-1">
                                            <PenTool className="size-5" />
                                            <span className="text-sm">Maykit</span>
                                        </div>
                                        <div className="px-3 py-1 rounded-full border">+$15</div>
                                    </HoverBorderGradient>
                                    <HoverBorderGradient
                                        containerClassName="rounded-md w-full"
                                        as="button"

                                        className="text-base   justify-between text-white flex w-full "
                                    >
                                        <div className="flex items-center gap-1">
                                            <PenTool className="size-5" />
                                            <span className="text-sm">Maykit</span>
                                        </div>
                                        <div className="px-3 py-1 rounded-full border">+$15</div>
                                    </HoverBorderGradient>
                                    <HoverBorderGradient
                                        containerClassName="rounded-md w-full"
                                        as="button"

                                        className="text-base   justify-between text-white flex w-full "
                                    >
                                        <div className="flex items-center gap-1">
                                            <PenTool className="size-5" />
                                            <span className="text-sm">Maykit</span>
                                        </div>
                                        <div className="px-3 py-1 rounded-full border">+$15</div>
                                    </HoverBorderGradient>
                                    <HoverBorderGradient
                                        containerClassName="rounded-md w-full"
                                        as="button"

                                        className="text-base   justify-between text-white flex w-full "
                                    >
                                        <div className="flex items-center gap-1">
                                            <PenTool className="size-5" />
                                            <span className="text-sm">Maykit</span>
                                        </div>
                                        <div className="px-3 py-1 rounded-full border">+$15</div>
                                    </HoverBorderGradient>
                                    
                                </ul> : <ul
                                    role="list"
                                    className={classNames(
                                        tier.featured ? 'text-gray-300' : 'text-neutral-400',
                                        'mt-8 space-y-3 text-sm/6 sm:mt-10',
                                    )}
                                >
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckIcon
                                                aria-hidden="true"
                                                className={classNames(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            }


                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}
