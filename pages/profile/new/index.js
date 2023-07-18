import { useState } from "react";
import Layout from "../../../layouts/Layout";
import Head from "next/head";

import SelectProfile from "../../../components/Profile/SelectProfile";
import NewProfile from "../../../components/Profile/New";

export default function CreateProfile() {
  const [profileType, setProfileType] = useState(null);

  return (
    <Layout title={"Profile"}>
      <Head>
        <link rel="shortcut icon" href="/smartdomino.ico" />
        <title>Crear Nuevo Pérfil</title>
      </Head>

        {!profileType && <SelectProfile setProfileType={setProfileType} />}

        {profileType && <NewProfile profileType={profileType} setProfileType={setProfileType} />}

    </Layout>
  );
};

