import React from "react"

import LandingBio from "../components/LandingBio"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const Bio = () => (
  <Layout>
    <SEO title="Bio" keywords={[`gatsby`, `application`, `react`]} />
    <LandingBio />
  </Layout>
)

export default Bio
