import { StatusBar } from "expo-status-bar"
import React, { FC, useEffect, useState } from "react"
import { View, ScrollView, Image } from "react-native"
import { profileAPI } from "../../api/social-api"
import Card from "../../components/Card"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"

const Profile: FC = () => {
  const { colors } = useMyTheme()
  const { id, email, login } = useTypedSelector((state) => state.auth)

  const [photo, setPhoto] = useState("")

  useEffect(() => {
    profileAPI.getProfile(id).then((data) => {
      setPhoto(data.photos.large)
    })
  }, [])

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Card>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 5,
              borderBottomWidth: 1,
              borderBottomColor: colors.divider,
            }}
          >
            <Image
              source={{
                uri: photo ? photo : undefined,
                height: 100,
                width: 100,
              }}
              style={{ borderRadius: 50, backgroundColor: "lightgray" }}
            />
          </View>
          <Card.Item text="Name" helperText={login} />
          <Card.Item text="Email" helperText={email} isLast />
        </Card>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  )
}

export default Profile
