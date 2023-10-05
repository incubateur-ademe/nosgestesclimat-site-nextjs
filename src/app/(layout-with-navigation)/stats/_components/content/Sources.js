import { useState } from 'react'

import Trans from '@/components/translation/Trans'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Table from './sources/Table'

export default function Sources(props) {
  const [newWebsites, setNewWebsites] = useState(false)
  const { t } = useClientTranslation()

  return (
    <section className="mt-8">
      <h3>
        <Trans>Origine des visites</Trans>
      </h3>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          {newWebsites ? (
            <Table
              title={t('Sites Web')}
              data={props.websites.filter(
                (website) =>
                  !props.oldWebsites.find(
                    (oldWebsite) => oldWebsite.label === website.label
                  )
              )}
              total={props.total}
              setNewWebsites={setNewWebsites}
              newWebsites={newWebsites}
            />
          ) : (
            <Table
              title={t('Sites Web')}
              data={props.websites}
              total={props.total}
              limit={5}
              setNewWebsites={setNewWebsites}
              newWebsites={newWebsites}
            />
          )}
        </div>

        <Table
          title={t('Réseaux Sociaux')}
          data={props.socials}
          total={props.total}
          limit={5}
        />
      </div>
    </section>
  )
}
