import React from 'react';
import { OnboardingComponent } from '../../../components/OnboardingComponent';
import The_searchSvg from '../../../assets/undraw_conversation_re_c26v.svg';

export function Onboarding2() {

    const page = 2;

    const subtitle = "Never forget that recommendation from a friend again"

    return (
        <>
            <OnboardingComponent title="Write down" subtitle={subtitle} page={page} Icon={<The_searchSvg height={328} />} />
        </>
    )
}
