import React, { useState, useEffect, ChangeEvent } from "react";

import {
  CheckPagePermissions,
  SettingsPageTitle,
  useNotification,
  useOverlayBlocker,
  useRBAC,
} from "@strapi/helper-plugin";

import Check from "@strapi/icons/Check";
import { Box } from "@strapi/design-system/Box";
import { Button } from "@strapi/design-system/Button";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { HeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import { Main } from "@strapi/design-system/Main";
import { Stack } from "@strapi/design-system/Stack";
import { Typography } from "@strapi/design-system/Typography";
import settingsRequests from "../../api/settings";
import FieldComp from "../../components/FieldComp/Fields";

const Settings = () => {
  const [apiKey, setApikey] = useState("");
  const { lockApp, unlockApp } = useOverlayBlocker();
  const notification = useNotification();

  const getConfig = async () => {
    const currentApiKey = await settingsRequests.getConfig();
    console.log(currentApiKey, "currentApiKey");
    setApikey(currentApiKey);
  };

  useEffect(() => {
    getConfig();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setApikey(event.target.value);
  };

  const handleOnSubmit = async () => {
    lockApp();
    const body = { apiKey: apiKey };
    const response = await settingsRequests.editConfig(body);
    if (response) {
      notification({
        type: "success",
        message: "Changes saved",
      });
    } else {
      notification({
        type: "warning",
        message: "Please enter a valid api key",
      });
    }
    unlockApp();
  };

  return (
    <>
      <HeaderLayout
        title={"api.video uploader"}
        primaryAction={
          <Button
            type="submit"
            onClick={handleOnSubmit}
            startIcon={<Check />}
            size="L"
          >
            Save
          </Button>
        }
      />

      <ContentLayout>
        <Box
          background="neutral0"
          hasRadius
          shadow="filterShadow"
          paddingTop={6}
          paddingBottom={6}
          paddingLeft={7}
          paddingRight={7}
        >
          <Stack size={4}>
            <Typography variant="delta" as="h2">
              Settings
            </Typography>
            <Grid gap={6}>
              <GridItem col={6} s={12}>
                <FieldComp
                  name="apiKey"
                  label="apiKey"
                  value={apiKey}
                  placeholder="Enter your Api Key"
                  description="Generated in the Api.video Dashboard and used for authenticating API calls against Api.Video"
                  detailsLink="https://docs.api.video/docs/upload-a-video-regular-upload"
                  isPassword
                  // error={errors && errors.access_token}
                  onChange={handleChange}
                />
              </GridItem>
            </Grid>
          </Stack>
        </Box>
      </ContentLayout>
    </>
  );
};

export default Settings;
