import { Binding } from 'astal'

export default function StatusLineDivider(props: {
  divider?: string,
  margin?: number,
  visible?: boolean | Binding<boolean | undefined> | undefined
}) {
  const { divider = '', margin = 5, visible = true } = props

  return (
    <label
      label={divider}
      visible={visible}
      css={`
        font-weight: 900;
        margin: 0 ${margin}px;
      `}
    />
  )
}
