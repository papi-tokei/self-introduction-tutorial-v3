<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="10">
        <v-row class="main_contents">
          <v-col
            sm="4"
            md="4"
            lg="4"
            xl="4"
            cols="12"
            class="d-flex flex-column justify-start align-center"
          >
            <v-img
              :src="require('@/assets/icon_image.png')"
              height="125"
              max-height="125"
              width="125"
              max-width="125"
            ></v-img>
            <h3 class="mt-6">{{ name }}</h3>
            <v-btn dark class="mt-4" @click="dialog = true">Edit</v-btn>
          </v-col>

          <v-col sm="8" md="8" lg="8" xl="8" cols="12">
            <div>
              <h3>Special Skill</h3>
              <p>
                {{ skill }}
              </p>
            </div>
            <div class="mt-6">
              <h3>Hobby</h3>
              <ul>
                <li v-for="hobby in hobbyList" :key="hobby">{{ hobby }}</li>
                <!-- <li>{{ hobbyList[1] }}</li>
                <li>{{ hobbyList[2] }}</li> -->
              </ul>
            </div>
            <div class="mt-6">
              <h3>Likes and Dislikes</h3>
              <P>{{ like }}</P>
            </div>
            <div class="mt-6">
              <h3>Comment</h3>
              <p>{{ comment }}</p>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-dialog v-model="dialog" persistent max-width="450">
        <v-card>
          <v-card-title class="headline">Edit Your Profile</v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="editName"
                :counter="20"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="editSkill"
                :counter="100"
                label="Special Skill"
                required
              ></v-text-field>
              <v-text-field
                v-for="(hobby, index) in editHobby"
                :key="hobby"
                v-model="editHobby[index]"
                :label="`Hobby${index}`"
                required
              ></v-text-field>
              <v-text-field
                v-model="editLike"
                label="like"
                :counter="100"
                required
              ></v-text-field>
              <v-text-field
                v-model="editComment"
                label="comment"
                :counter="100"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="cancelProfile">
              Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="saveProfile">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar" dark top color="error">
        {{ errorMessage }}
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { SelfIntroductionMainInterface } from "../types/main";

// TODO: エンドポイントを修正する
const URL =
  "https://xxxx.execute-api.ap-northeast-1.amazonaws.com/prod/user-data";

export default Vue.extend({
  name: "SelfIntroductionMain",

  data: (): SelfIntroductionMainInterface => ({
    dialog: false,
    snackbar: false,
    errorMessage: "",
    name: "Taro Tanaka",
    skill: "特技は特にありません。",
    hobbyList: ["Dead by Daylight", "寝ること", "走ること"],
    like: "食べ物に好き嫌いはありません。",
    comment: "よろしくお願いします。",
    editName: "",
    editSkill: "",
    editHobby: ["", "", ""],
    editLike: "",
    editComment: "",
    profileData: {
      id: "",
      name: "",
      skill: "",
      "hobby-list": [],
      like: "",
      comment: ""
    }
  }),
  async created(): Promise<void> {
    await this.getProfileData();
    this.updateData();
    this.cancelProfile();
  },
  methods: {
    cancelProfile(): void {
      this.editName = this.name;
      this.editSkill = this.skill;
      this.editHobby = this.hobbyList.concat();
      this.editLike = this.like;
      this.editComment = this.comment;
      this.dialog = false;
    },
    async getProfileData(): Promise<void> {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = await this.axios.post(URL, { method: "get" });
        this.profileData = response[0];
      } catch (err) {
        console.error(err);
        this.profileData = null;
      }
    },
    async saveProfile(): Promise<void> {
      try {
        await this.axios.post(URL, {
          method: "update",
          data: {
            id: "1",
            name: this.editName,
            skill: this.editSkill,
            "hobby-list": this.editHobby,
            like: this.editLike,
            comment: this.editComment
          }
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = await this.axios.post(URL, { method: "get" });
        this.profileData = response[0];
        this.updateData();
      } catch (err) {
        this.errorMessage = err;
        this.snackbar = true;
      }

      this.dialog = false;
    },
    updateData(): void {
      if (this.profileData) {
        this.name = this.profileData.name;
        this.skill = this.profileData.skill;
        this.hobbyList = this.profileData["hobby-list"];
        this.like = this.profileData.like;
        this.comment = this.profileData.comment;
      }
    }
  }
});
</script>

<style scoped>
.main_contents {
  border: solid;
  border-color: gray;
}
</style>
