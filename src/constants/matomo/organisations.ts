export const clickStartButtonLandingPageEvent = [
  'trackEvent',
  'Organisations',
  'clic_start_button',
]

export const clickAskDemoLandingPageEvent = [
  'trackEvent',
  'Organisations',
  'clic_ask_demo_button',
]

export const clickStartButtonFooterLandingPageEvent = [
  'trackEvent',
  'Organisations',
  'clic_start_footer_button',
]

export const clickAskDemoFooterLandingPageEvent = [
  'trackEvent',
  'Organisations',
  'clic_ask_demo_footer_button',
]

export const getParticipantInscriptionPageVisitedEvent = (
  pageVisited: string
) => [
  'trackEvent',
  'Organisations',
  'participant_inscription_page_visited',
  null,
  pageVisited,
]

export const clickSettingsLinkEvent = [
  'trackEvent',
  'Organisations',
  'click_visit_settings_page',
]

export const getClickAdditionalQuestionEvent = (
  questionLabel: string,
  isActivating: boolean
) => [
  'trackEvent',
  'Organisations',
  `click_${isActivating ? 'activate' : 'deactivate'}_additional_question`,
  null,
  questionLabel,
]

// Tableau de bord
export const clickButtonScrollToShareSectionEvent = [
  'trackEvent',
  'Organisations',
  'click_scroll_to_share_section_button',
]

export const clickCopyShareLinkEvent = [
  'trackEvent',
  'Organisations',
  'click_copy_share_link_button',
]

export const getClickCtaToolsEvent = (toolName: string) => [
  'trackEvent',
  'Organisations',
  'click_cta_tools',
  null,
  toolName,
]

export const clickIframeIntegrationGuideEvent = [
  'trackEvent',
  'Organisations',
  'click_iframe_integration_guide',
]

export const clickSeeDetailedReportEvent = [
  'trackEvent',
  'Organisations',
  'click_see_detailed_report_button',
]

export const clickExportDataDashboardEvent = [
  'trackEvent',
  'Organisations',
  'click_export_data_dashboard_button',
]

export const clickExportDataDetailledResultsPageEvent = [
  'trackEvent',
  'Organisations',
  'click_export_data_detailed_results_page_button',
]
