import { DynamicSelector } from '../DynamicSelector/DynamicSelector'

interface DynamicChainageSelectorProps {
  values: string[]
  options: string[]
  rowErrors?: string[]
  onChange: (index: number, value: string) => void
  onAdd: () => void
  onRemove: (index: number) => void
}

export function DynamicChainageSelector(props: DynamicChainageSelectorProps) {
  return <DynamicSelector title="Assigned Chainage(s)" rowLabel="Chainage" {...props} />
}
