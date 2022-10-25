/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import {
  Layout,
  ContentLayout,
  BaseHeaderLayout,
} from "@strapi/design-system/Layout";
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { Box } from "@strapi/design-system/Box";
import ArrowRight from "@strapi/icons/ArrowRight";
import Plus from "@strapi/icons/Plus";
import { Button } from "@strapi/design-system/Button";
import { Illo } from "../../components/Illo";
import Video from "@api.video/nodejs-client/lib/model/Video";

import { GridBroadcast } from "../../components/Videos/styles";
import assetRequest from "../../api/assets";
import UploadButton from "../../components/UploadButton";
import VideoView from "../../components/Videos";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<Video[]>([]);

  const history = useHistory();
  const onSettingsClick = () => {
    history.push(`/settings/${pluginId}`);
  };

  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);
    const { data } = await assetRequest.getAllvideos();
    console.table(data);
    setIsLoading(false);
    setAssets(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <LoadingIndicatorPage />;
  return (
    <Layout>
      <BaseHeaderLayout
        title="Api.Video Uploader"
        subtitle="Build web or in-app video, faster."
        as="h2"
        primaryAction={<UploadButton updateData={fetchData} />}
      />
      <ContentLayout>
        {/* <h1>{pluginId}&apos;s HomePage</h1> */}
        <Box padding={8} background="neutral100">
          <EmptyStateLayout
            icon={<Illo />}
            content="In order for uploads to function, an administrator will need to complete the setup of this plugin by visiting the settings page. Click the button below to be taken there now."
            action={
              <Button
                variant="default"
                endIcon={<ArrowRight />}
                onClick={onSettingsClick}
              >
                Go to settings
              </Button>
            }
          />
        </Box>

        <GridBroadcast>
          {assets.length > 0 &&
            assets?.map((video) => {
              const { videoId } = video;
              return <VideoView video={video} key={videoId} />;
            })}
        </GridBroadcast>
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
