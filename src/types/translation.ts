export enum Lang {
	Default = 'Fr',
	Fr = 'Fr',
	En = 'En',
	// Commented until validation by a native speaker
	// Es = 'Es',
	// It = 'It',
}

export type Release = {
	name: string
	published_at: string
	body: string
}

export type LangInfos = {
	name: string
	abrv: string
	abrvLocale: string
	faqContent: string // The FAQ content in YAML
	releases: Release[] // The releases content in JSON
	uiTrad: any // The UI translation in YAML
}
