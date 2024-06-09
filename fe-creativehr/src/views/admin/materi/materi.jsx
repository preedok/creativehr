import React from 'react'
import ContentCard from '../../../components/card-content/ContentCard'
import Breadcrombss from '../../../components/breadcrombs/Breadcrombss'
const Materi = () => {
    return (
        <section className="p-6 mx-8 mt-3 rounded-lg w-full">
            <Breadcrombss
                menu={'Materi'}
                submenu={'Materi'}
            />
            <ContentCard>
                <h3>heheh</h3>
            </ContentCard>
        </section>
    )
}

export default Materi
