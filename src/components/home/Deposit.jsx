import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import dynamic from 'next/dynamic'

import AmountBox from '../common/AmountBox'
import { Box, Container } from '../common/Container'
import { Type } from '../common/Text'
import SelectBox from './SelectBox'
import { chains, validChains } from '../../constants/chains'
import { useMuonState } from '../../context'
import { GradientTitle, Title, TriangleDown, BoxDestination } from '.'
import MuonNetwork from '../common/MuonNetwork'
import NetworkHint from '../common/NetworkHint'
import { NameChainMap } from '../../constants/chainsMap'

const CopyTokenAddress = dynamic(() => import('./CopyTokenAddress'))
const Info = dynamic(() => import('./Info'))
const ActionButton = dynamic(() => import('./ActionButton'))

const Deposit = (props) => {
  const {
    wrongNetwork,
    destChains,
    // tokenBalance,
    updateBridge,
    handleConnectWallet,
    handleDeposit,
    handleApprove,
    errorAmount
  } = props
  const { state } = useMuonState()

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Title>Muon MRC20 </Title>
      <GradientTitle margin="0 0 10px">Cross-Chain Transfer</GradientTitle>
      {/* <Flex flexDirection="column" width="100%"> */}
      <Container maxWidth="470px">
        <Box
          background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 126.95%)"
          // minHeight="395px"
        >
          <Flex flexDirection="column" width="100%">
            <SelectBox
              label="Select Origin Chain"
              placeholder={`${NameChainMap[validChains[0]]}, ${
                NameChainMap[validChains[1]]
              }, ...`}
              data={chains}
              type="chain"
              value={state.bridge.fromChain.id}
              onChange={(data) => updateBridge('fromChain', data)}
              marginBottom={state.bridge.fromChain.id ? '5px' : '35px'}
            />
            {state.bridge.fromChain.id && <NetworkHint error={wrongNetwork} />}
            <SelectBox
              label="Select an Asset"
              data={state.showTokens}
              type="token"
              marginBottom={state.bridge.token.id ? '5px' : '35px'}
              value={state.bridge.token.id}
              border={
                state.bridge.fromChain && state.bridge.token
                  ? !state.fromChainTokenExit
                    ? '0.75px solid rgba(220, 81, 81, 1)'
                    : '0.75px solid rgba(0, 227, 118, 1)'
                  : ''
              }
              onChange={(data) => {
                updateBridge('token', data)
              }}
            />
            {state.bridge.token && state.bridge.fromChain && (
              <Info
                generateBridge={state.fromChainTokenExit}
                chain={state.bridge.fromChain}
              />
            )}

            <AmountBox
              value={state.bridge.amount}
              tokenBalance={state.tokenBalance}
              errorAmount={errorAmount}
              onChange={(data) => updateBridge('amount', data)}
              margin={state.bridge.token.id ? '0 0 5px' : '0 0 35px'}
            />
            {state.bridge.token && state.bridge.fromChain && (
              <CopyTokenAddress marginBottom="0" />
            )}
          </Flex>
        </Box>
        <TriangleDown />
        <BoxDestination>
          <SelectBox
            marginBottom={state.bridge.toChain.id ? '5px' : '35px'}
            label="Select Destination Chain"
            placeholder={`${NameChainMap[validChains[0]]}, ${
              NameChainMap[validChains[1]]
            }, ...`}
            data={destChains}
            type="chain"
            value={state.bridge.toChain.id}
            onChange={(data) => updateBridge('toChain', data)}
            border={
              state.bridge.toChain && state.bridge.token
                ? !state.toChainTokenExit
                  ? '0.75px solid rgba(220, 81, 81, 1)'
                  : '0.75px solid rgba(0, 227, 118, 1)'
                : ''
            }
          />
          {state.bridge.token && state.bridge.toChain && (
            <>
              <Info
                generateBridge={state.toChainTokenExit}
                chain={state.bridge.toChain}
                marginBottom="5px"
              />
              {state.toChainTokenExit && (
                <CopyTokenAddress toChain={true} marginBottom="5px" />
              )}
            </>
          )}
        </BoxDestination>
      </Container>
      {/* </Flex> */}
      <ActionButton
        wrongNetwork={wrongNetwork}
        handleConnectWallet={handleConnectWallet}
        handleDeposit={handleDeposit}
        handleApprove={handleApprove}
      />
      <Flex justifyContent="center" margin="50px 0 20px">
        <Type.SM color="#313144" fontSize="10px" padding="10px">
          Powered by
        </Type.SM>
        <MuonNetwork logo="muonNetworkBlack" />
      </Flex>
    </Flex>
  )
}

export default Deposit
