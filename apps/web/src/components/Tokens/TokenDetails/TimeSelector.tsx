import { TimePeriod } from 'graphql/data/util'
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import styled from 'styled-components'

import { MEDIUM_MEDIA_BREAKPOINT } from '../constants'
import { DISPLAYS, ORDERED_TIMES } from '../TokenTable/TimeSelector'

export const refitChartContentAtom = atom<(() => void) | undefined>(undefined)

const TimeOptionsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`
const TimeOptionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
  gap: 4px;
  border-radius: 16px;
  height: 40px;
  padding: 4px;
  width: fit-content;

  @media only screen and (max-width: ${MEDIUM_MEDIA_BREAKPOINT}) {
    width: 100%;
    justify-content: space-between;
    border: none;
  }
`
const TimeButton = styled.button<{ active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, active }) => (active ? theme.surface3 : 'transparent')};
  font-weight: 535;
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 12px;
  line-height: 20px;
  border: none;
  cursor: pointer;
  color: ${({ theme, active }) => (active ? theme.neutral1 : theme.neutral2)};
  transition-duration: ${({ theme }) => theme.transition.duration.fast};
  :hover {
    ${({ active, theme }) => !active && `opacity: ${theme.opacity.hover};`}
  }
`

export default function TimePeriodSelector({
  timePeriod,
  onChangeTimePeriod,
}: {
  timePeriod: TimePeriod
  onChangeTimePeriod: (t: TimePeriod) => void
}) {
  const refitChartContent = useAtomValue(refitChartContentAtom)

  return (
    <TimeOptionsWrapper>
      <TimeOptionsContainer>
        {ORDERED_TIMES.map((time) => (
          <TimeButton
            key={DISPLAYS[time]}
            active={timePeriod === time}
            onClick={() => {
              if (timePeriod === time) {
                refitChartContent?.()
              } else {
                onChangeTimePeriod(time)
              }
            }}
          >
            {DISPLAYS[time]}
          </TimeButton>
        ))}
      </TimeOptionsContainer>
    </TimeOptionsWrapper>
  )
}
