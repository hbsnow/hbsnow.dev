export type LinkType = {
  to?: string
} & ExternalLinkType

export type ExternalLinkType<T = string> = {
  name: T
  href: string
}
