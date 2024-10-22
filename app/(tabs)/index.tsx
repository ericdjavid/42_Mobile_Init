import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { exchangeCodeForToken } from '@/utils/authUtils';
import * as Linking from 'expo-linking';
import axios from 'axios';
import { Image } from 'expo-image';
import { useUserStore } from '@/useUserStore';

export default function TabOneScreen() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null); // State to store user info
  const clientId = process.env.CLIENT_ID;
  const redirectUri = encodeURIComponent(process.env.REDIRECT_URI || 'http://localhost:8081/');
  const state = 'a_very_long_random_string_witchmust_be_unguessable';
  const scope = 'public';


  const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-a4a00e5c139fa9b8d27460e21465c63c84cfc74dbf9f115782f5d32abdd5f9ad&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;

  useEffect(() => {
    async function getUrl() {
      const url = await Linking.getInitialURL();
      setCurrentUrl(url);
      const code = getCodeFromUrl(url);
      if (code) {
        exchangeCodeForToken(code).then(token => {
          console.log('Access Token:', token);
          console.log(userInfo);
          setAccessToken(token);
          fetchUserInfo(token); // Fetch user info after getting the token
        }).catch(error => {
          console.error('Error exchanging code for token:', error);
        });
      }
    }
    getUrl();
  }, []);

  function getCodeFromUrl(url: string | null): string | null {
    if (!url) return null;
    const urlParams = new URLSearchParams(url.split('?')[1]);
    return urlParams.get('code');
  }

  function handleAuthButtonPress() {
    Linking.openURL(authUrl).catch(err => console.error('Error opening URL:', err));
  }

  const updateUserInfo = useUserStore((state) => state.setUserInfo);

  async function fetchUserInfo(token: string) {
    try {
      const response = await axios.get('https://api.intra.42.fr/v2/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      updateUserInfo([response.data]); // Use the renamed function
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text> */}
      {accessToken ? (
        <ScrollView style={{
          width: '100%',
        }}>
          <Text style={styles.connectedText}>Welcome {userInfo?.login}!</Text>
          {/* Display user image react native */}
          <Image
            style={{ width: 100, height: 100 }}
            source={userInfo?.image.link}
            contentFit="cover"
            transition={1000}
          />
          {/* {JSON.stringify(userInfo.image.link)} */}
          {/* <Text style={styles.tokenText}>Access Token: {accessToken}</Text> */}
          {userInfo && (
            // <ScrollView style={styles.scrollView}>
            <>
              <Text style={styles.userInfoText}>User Info:</Text>
              <Text style={styles.userInfoDetailText}>LOGIN: {userInfo.login}</Text>
              <Text style={styles.userInfoDetailText}>EMAIL: {userInfo.email}</Text>
              <Text style={styles.userInfoDetailText}>FIRST NAME: {userInfo.first_name}</Text>
              <Text style={styles.userInfoDetailText}>LAST NAME: {userInfo.last_name}</Text>
              {Object.entries(userInfo).map(([key, value]) => (
                <Text key={key} style={styles.userInfoDetailText}>
                  {key}: {JSON.stringify(value, null, 2)}
                </Text>
              ))}
            </>
            // </ScrollView>
          )}
        </ScrollView>
      ) : (
        <View>
          <Button title="Authenticate with 42" onPress={handleAuthButtonPress} />
          {/* <Text style={styles.urlText}>Current URL: {currentUrl}</Text> */}
        </View>
      )}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  connectedText: {
    fontSize: 18,
    color: 'green',
    marginVertical: 10,
  },
  tokenText: {
    fontSize: 14,
    color: 'blue',
  },
  userInfoText: {
    fontSize: 16,
    color: 'purple',
    marginVertical: 10,
  },
  urlText: {
    fontSize: 12,
    color: 'red',
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  scrollView: {
    maxHeight: 200, // Adjust the height as needed
    marginVertical: 10,
  },
  userInfoDetailText: {
    fontSize: 14,
    color: 'black',
    marginVertical: 2,
  },
});
