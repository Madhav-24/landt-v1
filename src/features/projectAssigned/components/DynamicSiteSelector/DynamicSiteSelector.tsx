import { DynamicSelector } from '../DynamicSelector/DynamicSelector'

interface DynamicSiteSelectorProps {
  values: string[]
  options: string[]
  rowErrors?: string[]
  onChange: (index: number, value: string) => void
  onAdd: () => void
  onRemove: (index: number) => void
}

export function DynamicSiteSelector(props: DynamicSiteSelectorProps) {
  return <DynamicSelector title="Assigned Site(s)" rowLabel="Site" {...props} />
}
