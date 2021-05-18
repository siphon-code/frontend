import React from 'react'
import styled from 'styled-components'
import every from 'lodash/every'
import {
  Stepper,
  Step,
  StepStatus,
  Card,
  CardBody,
  Heading,
  Text,
  Button,
  Link,
  OpenNewIcon,
} from 'siphon-uikit'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import useI18n from 'hooks/useI18n'
import useTokenBalance from 'hooks/useTokenBalance'
import Container from 'components/layout/Container'
import { useProfile } from 'state/hooks'
import { Token } from 'config/constants/types'
import { getAddress } from 'utils/addressHelpers'

interface Props {
  currency: Token
}

const Wrapper = styled(Container)`
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
  margin-left: -16px;
  margin-right: -16px;
  padding-top: 48px;
  padding-bottom: 48px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: -24px;
    margin-right: -24px;
  }
`

const IfoSteps: React.FC<Props> = ({ currency }) => {
  const { hasProfile } = useProfile()
  const TranslateString = useI18n()
  const balance = useTokenBalance(getAddress(currency.address))
  const stepsValidationStatus = [hasProfile, balance.isGreaterThan(0), false, false]

  const getStatusProp = (index: number): StepStatus => {
    const arePreviousValid = index === 0 ? true : every(stepsValidationStatus.slice(0, index), Boolean)
    if (stepsValidationStatus[index]) {
      return arePreviousValid ? 'past' : 'future'
    }
    return arePreviousValid ? 'current' : 'future'
  }

  const renderCardBody = (step: number) => {
    const isStepValid = stepsValidationStatus[step]
    switch (step) {
      case 0:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              Activate your Profile
            </Heading>
            <Text color="textSubtle" small mb="16px">
              You’ll need an active PancakeSwap Profile to take part in an IFO!
            </Text>
            {isStepValid ? (
              <Text color="success" bold>
                {TranslateString(999, 'Profile Active!')}
              </Text>
            ) : (
              <Button as={Link} href="/profile">
                {TranslateString(999, 'Activate you profile')}
              </Button>
            )}
          </CardBody>
        )
      case 1:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              Get CAKE-BNB LP Tokens
            </Heading>
            <Text color="textSubtle" small>
              Stake CAKE and BNB in the liquidity pool to get LP tokens. <br />
              You’ll spend them to buy IFO sale tokens.
            </Text>
            <Button
              as={Link}
              external
              href={`${BASE_ADD_LIQUIDITY_URL}/BNB/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82`}
              endIcon={<OpenNewIcon color="white" />}
              mt="16px"
            >
              {TranslateString(999, 'Get LP tokens')}
            </Button>
          </CardBody>
        )
      case 2:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              Commit LP Tokens
            </Heading>
            <Text color="textSubtle" small>
              When the IFO sales are live, you can “commit” your LP tokens to buy the tokens being sold. <br />
              We recommend committing to the Basic Sale first, but you can do both if you want.
            </Text>
          </CardBody>
        )
      case 3:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              Claim your tokens and achievement
            </Heading>
            <Text color="textSubtle" small>
              After the IFO sales finish, you can claim any IFO tokens that you bought, and any unspent CAKE-BNB LP
              tokens will be returned to your wallet.
            </Text>
          </CardBody>
        )
      default:
        return null
    }
  }

  return (
    <Wrapper>
      <Heading as="h2" size="xl" color="secondary" mb="24px" textAlign="center">
        {TranslateString(999, 'How to Take Part')}
      </Heading>
      <Stepper>
        {stepsValidationStatus.map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Step key={index} index={index} status={getStatusProp(index)}>
            <Card>{renderCardBody(index)}</Card>
          </Step>
        ))}
      </Stepper>
    </Wrapper>
  )
}

export default IfoSteps
