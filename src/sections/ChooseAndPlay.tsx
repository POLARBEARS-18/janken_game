import { css } from '@emotion/react'
import { HandleSelection } from 'components'
import { FC } from 'react'
import { FaRegHandPaper, FaRegHandRock, FaRegHandScissors } from 'react-icons/fa'

const ChooseAndPlay: FC = () => (
  <>
    <div css={SChoiceBtnCtn}>
      <HandleSelection name="rock" icon={<FaRegHandRock size={60} />} />
      <HandleSelection name="paper" icon={<FaRegHandPaper size={60} />} />
      <HandleSelection name="scissors" icon={<FaRegHandScissors size={60} />} />
    </div>
    <button type="button" css={SPlayBtn}>
      Play
    </button>
  </>
)

export default ChooseAndPlay

const SChoiceBtnCtn = css`
  display: flex;
  justify-content: center;
  gap: 3.125rem;
`
const SPlayBtn = css`
  color: black;
  background-color: bisque;
  padding: 0.625rem 1.875rem;
  margin-top: 3.125rem;
  font-weight: bold;
`
