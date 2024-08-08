import {
  Card,
  CardContent,
  CardDescription,
  CardGroup,
  CardHeader,
  CardLabel,
  CardTitle,
} from '@sushiswap/ui'
import { FC } from 'react'
import { formatUSD } from 'sushi/format'
import { formatNumberWithDecimals } from '~aptos/(common)/lib/common/format-number-with-decimals'
import { useStablePrice } from '~aptos/(common)/lib/common/use-stable-price'
import { Pool } from '~aptos/pool/lib/convert-pool-to-sushi-pool'
import { useTokensFromPool } from '~aptos/pool/lib/use-tokens-from-pool'
import { CardCurrencyAmountItem } from '../CardCurrencyAmountItem'

interface PoolCompositionProps {
  row: Pool
}

export const PoolComposition: FC<PoolCompositionProps> = ({ row }) => {
  const { token0, token1 } = useTokensFromPool(row)

  const token0Price = useStablePrice({ currency: token0 })
  const token1Price = useStablePrice({ currency: token1 })

  const balanceX = formatNumberWithDecimals(
    Number(row?.reserve0),
    token0.decimals,
  )
  const balanceY = formatNumberWithDecimals(
    Number(row?.reserve1),
    token1.decimals,
  )

  const token0PoolPrice = token0Price ? token0Price * Number(balanceX) : 0
  const token1PoolPrice = token1Price ? token1Price * Number(balanceY) : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pool Liquidity</CardTitle>
        <CardDescription>
          {formatUSD(token0PoolPrice + token1PoolPrice)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardGroup>
          <CardLabel>Tokens</CardLabel>
          <CardCurrencyAmountItem
            amount={Number(balanceX)}
            currency={token0}
            fiatValue={formatUSD(token0PoolPrice)}
          />
          <CardCurrencyAmountItem
            amount={Number(balanceY)}
            currency={token1}
            fiatValue={formatUSD(token1PoolPrice)}
          />
        </CardGroup>
      </CardContent>
    </Card>
  )
}
