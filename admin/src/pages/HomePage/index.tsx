/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from "react";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import {
  Layout,
  ContentLayout,
  BaseHeaderLayout,
} from "@strapi/design-system/Layout";

import { GridBroadcast } from "../../components/Videos/styles";
import assetRequest from "../../api/assets";
import VideoView from "../../components/Videos";
import settingsRequests from "../../api/settings";
import SetupNeeded from "../../components/SetupNeeded";
import { Loader } from "@strapi/design-system/Loader";
import EmptyState from "../../components/EmptyState";
import { CustomVideo } from "../../../../types";
import AddButton from "../../components/Button/AddButton";
import SearchBar from "../../components/SearchBar";

const HomePage = () => {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingConfiguration, setIsLoadingConfiguration] = useState(false);
  const [isConfigurated, setIsConfigurated] = useState(false);
  const [assets, setAssets] = useState<CustomVideo[]>([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    if (isLoadingData === false) setIsLoadingData(true);
    const data = await assetRequest.getAllvideos();
    console.table(data);
    setIsLoadingData(false);
    setAssets(data);
  };

  const getConfig = async () => {
    setIsLoadingConfiguration(true);
    const currentApiKey = await settingsRequests.getConfig();
    setIsConfigurated(currentApiKey?.length > 0);
    setIsLoadingConfiguration(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    getConfig();
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
  };
  if (isLoadingConfiguration) return <LoadingIndicatorPage />;
  return (
    <Layout>
      <BaseHeaderLayout
        title="api.video uploader"
        subtitle="Integrate video with a few lines of code"
        as="h2"
        primaryAction={isConfigurated && <AddButton update={fetchData} />}
      />
      <ContentLayout>
        {isConfigurated ? (
          !isLoadingData && assets?.length > 0 ? (
            <>
              <SearchBar
                search={search}
                handleSearch={(query) => handleSearch(query)}
                clearSearch={() => setSearch("")}
              />
              <GridBroadcast>
                {assets
                  .filter((item) => item.title.includes(search))
                  .map((video) => {
                    const { videoId } = video;
                    return (
                      <VideoView
                        video={video}
                        key={videoId}
                        updateData={fetchData}
                      />
                    );
                  })}
              </GridBroadcast>
            </>
          ) : (
            <EmptyState update={fetchData} />
          )
        ) : (
          <SetupNeeded />
        )}
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
