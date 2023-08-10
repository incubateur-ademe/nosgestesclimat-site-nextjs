export type RegionAuthor = {
	nom: string
	url?: string
}

export type RegionCode = string & keyof Region

export type RegionParams = {
	code: RegionCode
	nom: string
	gentilé: string
	authors?: RegionAuthor[]
	drapeau?: string
}

export type Region = {
	(fr: RegionCode): RegionParams
	(en: RegionCode): RegionParams
}

export type Localisation = {
	country: { code: RegionCode; name: string }
	userChosen: boolean
}
