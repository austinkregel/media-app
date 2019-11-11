const dataset = [
    {
        "input":"The Walking Dead S05E03 720p HDTV x264-ASAP[ettv]",
        "output":"The Walking Dead"
    },
    {
        "input":"Hercules (2014) 1080p BrRip H264 - YIFY",
        "output":"Hercules"
    },
    {
        "input":"Dawn.of.the.Planet.of.the.Apes.2014.HDRip.XViD-EVO",
        "output":"Dawn of the Planet of the Apes"
    },
    {
        "input":"Dawn of the Planet of the Apes (2014) HDRip XViD - EVO",
        "output":"Dawn of the Planet of the Apes"
    },
    {
        "input":"The Big Bang Theory S08E06 HDTV XviD-LOL [eztv]",
        "output":"The Big Bang Theory"
    },
    {
        "input":"22 Jump Street (2014) 720p BrRip x264 - YIFY",
        "output":"22 Jump Street"
    },
    {
        "input":"Hercules.2014.EXTENDED.1080p.WEB-DL.DD5.1.H264-RARBG",
        "output":"Hercules"
    },
    {
        "input":"02. Hercules.mp4",
        "output":"Hercules"
    },
    {
        "input":"Hercules (2014) WEBDL DVDRip XviD-MAX",
        "output":"Hercules"
    },
    {
        "input":"WWE Hell in a Cell 2014 PPV WEB-DL x264-WD -={SPARROW}=-",
        "output":"WWE Hell in a Cell"
    },
    {
        "input":"UFC.179.PPV.HDTV.x264-Ebi[rartv]",
        "output":"UFC 179"
    },
    {
        "input":"Marvels Agents of S.H.I.E.L.D. S02E05 HDTV x264-KILLERS [eztv]",
        "output":"Marvels Agents of S.H.I.E.L.D."
    },
    {
        "input":"X-Men.Days.of.Future.Past.2014.1080p.WEB-DL.DD5.1.H264-RARBG",
        "output":"X-Men Days of Future Past"
    },
    {
        "input":"Guardians Of The Galaxy 2014 R6 720p HDCAM x264-JYK",
        "output":"Guardians Of The Galaxy"
    },
    {
        "input":"Marvel's.Agents.of.S.H.I.E.L.D.S02E01.Shadows.1080p.WEB-DL.DD5.1",
        "output":"Marvel's Agents of S H I E L D"
    },
    {
        "input":"Marvels Agents of S.H.I.E.L.D. S02E06 HDTV x264-KILLERS[ettv]",
        "output":"Marvels Agents of S.H.I.E.L.D."
    },
    {
        "input":"Guardians of the Galaxy (CamRip / 2014)",
        "output":"Guardians of the Galaxy"
    },
    {
        "input":"The.Walking.Dead.S05E03.1080p.WEB-DL.DD5.1.H.264-Cyphanix[rartv]",
        "output":"The Walking Dead"
    },
    {
        "input":"Brave.2012.R5.DVDRip.XViD.LiNE-UNiQUE",
        "output":"Brave"
    },
    {
        "input":"Lets.Be.Cops.2014.BRRip.XViD-juggs[ETRG]",
        "output":"Lets Be Cops"
    },
    {
        "input":"These.Final.Hours.2013.WBBRip XViD",
        "output":"These Final Hours"
    },
    {
        "input":"Downton Abbey 5x06 HDTV x264-FoV [eztv]",
        "output":"Downton Abbey"
    },
    {
        "input":"Annabelle.2014.HC.HDRip.XViD.AC3-juggs[ETRG]",
        "output":"Annabelle"
    },
    {
        "input":"Lucy.2014.HC.HDRip.XViD-juggs[ETRG]",
        "output":"Lucy"
    },
    {
        "input":"The Flash 2014 S01E04 HDTV x264-FUM[ettv]",
        "output":"The Flash"
    },
    {
        "input":"South Park S18E05 HDTV x264-KILLERS [eztv]",
        "output":"South Park"
    },
    {
        "input":"The Flash 2014 S01E03 HDTV x264-LOL[ettv]",
        "output":"The Flash"
    },
    {
        "input":"The Flash 2014 S01E01 HDTV x264-LOL[ettv]",
        "output":"The Flash"
    },
    {
        "input":"Lucy 2014 Dual-Audio WEBRip 1400Mb",
        "output":"Lucy"
    },
    {
        "input":"Teenage Mutant Ninja Turtles (HdRip / 2014)",
        "output":"Teenage Mutant Ninja Turtles"
    },
    {
        "input":"Teenage Mutant Ninja Turtles (unknown_release_type / 2014)",
        "output":"Teenage Mutant Ninja Turtles"
    },
    {
        "input":"The Simpsons S26E05 HDTV x264 PROPER-LOL [eztv]",
        "output":"The Simpsons"
    },
    {
        "input":"2047 - Sights of Death (2014) 720p BrRip x264 - YIFY",
        "output":"2047 - Sights of Death"
    },
    {
        "input":"Two and a Half Men S12E01 HDTV x264 REPACK-LOL [eztv]",
        "output":"Two and a Half Men"
    },
    {
        "input":"Dinosaur 13 2014 WEBrip XviD AC3 MiLLENiUM",
        "output":"Dinosaur 13"
    },
    {
        "input":"Teenage.Mutant.Ninja.Turtles.2014.HDRip.XviD.MP3-RARBG",
        "output":"Teenage Mutant Ninja Turtles"
    },
    {
        "input":"Dawn.Of.The.Planet.of.The.Apes.2014.1080p.WEB-DL.DD51.H264-RARBG",
        "output":"Dawn Of The Planet of The Apes"
    },
    {
        "input":"Teenage.Mutant.Ninja.Turtles.2014.720p.HDRip.x264.AC3.5.1-RARBG",
        "output":"Teenage Mutant Ninja Turtles"
    },
    {
        "input":"Gotham.S01E05.Viper.WEB-DL.x264.AAC",
        "output":"Gotham"
    },
    {
        "input":"Into.The.Storm.2014.1080p.WEB-DL.AAC2.0.H264-RARBG",
        "output":"Into The Storm"
    },
    {
        "input":"Lucy 2014 Dual-Audio 720p WEBRip",
        "output":"Lucy"
    },
    {
        "input":"Into The Storm 2014 1080p BRRip x264 DTS-JYK",
        "output":"Into The Storm"
    },
    {
        "input":"Sin.City.A.Dame.to.Kill.For.2014.1080p.BluRay.x264-SPARKS",
        "output":"Sin City A Dame to Kill For"
    },
    {
        "input":"WWE Monday Night Raw 3rd Nov 2014 HDTV x264-Sir Paul",
        "output":"WWE Monday Night Raw 3rd Nov"
    },
    {
        "input":"Jack.And.The.Cuckoo-Clock.Heart.2013.BRRip XViD",
        "output":"Jack And The Cuckoo-Clock Heart"
    },
    {
        "input":"WWE Hell in a Cell 2014 HDTV x264 SNHD",
        "output":"WWE Hell in a Cell"
    },
    {
        "input":"Dracula.Untold.2014.TS.XViD.AC3.MrSeeN-SiMPLE",
        "output":"Dracula Untold"
    },
    {
        "input":"The Missing 1x01 Pilot HDTV x264-FoV [eztv]",
        "output":"The Missing"
    },
    {
        "input":"Doctor.Who.2005.8x11.Dark.Water.720p.HDTV.x264-FoV[rartv]",
        "output":"Doctor Who"
    },
    {
        "input":"Gotham.S01E07.Penguins.Umbrella.WEB-DL.x264.AAC",
        "output":"Gotham"
    },
    {
        "input":"One Shot [2014] DVDRip XViD-ViCKY",
        "output":"One Shot"
    },
    {
        "input":"The Shaukeens 2014 Hindi (1CD) DvDScr x264 AAC...Hon3y",
        "output":"The Shaukeens"
    },
    {
        "input":"Annabelle.2014.1080p.PROPER.HC.WEBRip.x264.AAC.2.0-RARBG",
        "output":"Annabelle"
    },
    {
        "input":"Interstellar (2014) CAM ENG x264 AAC-CPG",
        "output":"Interstellar"
    },
    {
        "input":"Guardians of the Galaxy (2014) Dual Audio DVDRip AVI",
        "output":"Guardians of the Galaxy"
    },
    {
        "input":"Eliza Graves (2014) Dual Audio WEB-DL 720p MKV x264",
        "output":"Eliza Graves"
    },
    {
        "input":"WWE Monday Night Raw 2014 11 10 WS PDTV x264-RKOFAN1990 -={SPARR",
        "output":"WWE Monday Night Raw"
    },
    {
        "input":"Sons.of.Anarchy.S01E03",
        "output":"Sons of Anarchy"
    },
    {
        "input":"doctor_who_2005.8x12.death_in_heaven.720p_hdtv_x264-fov",
        "output":"doctor who"
    },
    {
        "input":"breaking.bad.s01e01.720p.bluray.x264-reward",
        "output":"breaking bad"
    },
    {
        "input":"Game of Thrones - 4x03 - Breaker of Chains",
        "output":"Game of Thrones"
    },
    {
        "input":"[720pMkv.Com]_sons.of.anarchy.s05e10.480p.BluRay.x264-GAnGSteR",
        "output":"sons of anarchy"
    },
    {
        "input":"[ www.Speed.cd ] -Sons.of.Anarchy.S07E07.720p.HDTV.X264-DIMENSION",
        "output":"Sons of Anarchy"
    },
    {
        "input":"Community.s02e20.rus.eng.720p.Kybik.v.Kybe",
        "output":"Community"
    },
    {
        "input":"The.Jungle.Book.2016.3D.1080p.BRRip.SBS.x264.AAC-ETRG",
        "output":"The Jungle Book"
    },
    {
        "input":"Ant-Man.2015.3D.1080p.BRRip.Half-SBS.x264.AAC-m2g",
        "output":"Ant-Man"
    },
    {
        "input":"Ice.Age.Collision.Course.2016.READNFO.720p.HDRIP.X264.AC3.TiTAN",
        "output":"Ice Age Collision Course"
    },
    {
        "input":"Red.Sonja.Queen.Of.Plagues.2016.BDRip.x264-W4F[PRiME]",
        "output":"Red Sonja Queen Of Plagues"
    },
    {
        "input":"The Purge: Election Year (2016) HC - 720p HDRiP - 900MB - ShAaNi",
        "output":"The Purge: Election Year"
    },
    {
        "input":"War Dogs (2016) HDTS 600MB - NBY",
        "output":"War Dogs"
    },
    {
        "input":"The Hateful Eight (2015) 720p BluRay - x265 HEVC - 999MB - ShAaN",
        "output":"The Hateful Eight"
    },
    {
        "input":"The.Boss.2016.UNRATED.720p.BRRip.x264.AAC-ETRG",
        "output":"The Boss"
    },
    {
        "input":"Return.To.Snowy.River.1988.iNTERNAL.DVDRip.x264-W4F[PRiME]",
        "output":"Return To Snowy River"
    },
    {
        "input":"03. Return.To.Snowy.River.mkv",
        "output":"Return To Snowy River"
    },
    {
        "input":"Akira (2016) - UpScaled - 720p - DesiSCR-Rip - Hindi - x264 - AC3 - 5.1 - Mafiaking - M2Tv",
        "output":"Akira"
    },
    {
        "input":"Ben Hur 2016 TELESYNC x264 AC3 MAXPRO",
        "output":"Ben Hur"
    },
    {
        "input":"The.Secret.Life.of.Pets.2016.HDRiP.AAC-LC.x264-LEGi0N",
        "output":"The Secret Life of Pets"
    },
    {
        "input":"038. The.Secret.Life.of.Pets.mp4",
        "output":"The Secret Life of Pets"
    }
];

const toNN = (song) => {
    let possibleOutput = song.split('').map(character => character.charCodeAt(0) / 255); 

    return possibleOutput.concat(Array("The Secret Life of Pets (2019) - Upscaled - 720p - DesiSCR-Rip Hindi - x264 - AC3 - 5.1 Mafiaking -M2Tv".length - possibleOutput.length).fill(0));
} 
const newDataset = [
    {
        input: [
            "038. Akira.mp4",
            "Akira.2016.HDRiP.AAC-LC.x264-LEGi0N",
            "Akira (2019) - Upscaled - 720p - DesiSCR-Rip Hindi - x264 - AC3 - 5.1 Mafiaking -M2Tv",
            "Akira 2017 TELESYNC X264 AC3 MAXPRO",
            "01.Akira.mp4",
            "Akira.UNRATED.720p.BRRip.x264.AAC-ETRG",
            "Akira (2012) 720p BluRay - x265 HEVC -972MB - ShAaN",
            "[ www.Speed.cd ] -Akira.S07E07.720p.HDTV.X264-DIMENSION",
            "Akira.s02e20.rus.eng.720p.Kybik.v.Kybe",
            "akira.8x12.death_in_heaven.720p_hdtv_x264-fov",
            "Akira",
            "[thing] Akira 3801.mov",
            "[720pMkv.Com]_akira.s05e10.480p.BluRay.x264-GAnGSteR",
            "Akira (2014) Dual Audio WEB-DL 720p MKV x264.mov",
            "akira(2014) Dual Audio 480p.BluRay.x264-GAnGSteR.mov",
            "02. Akira.mp4",
        ],
        output: ('Akira'),
    },
    {
        input: [
            "038. The.Secret.Life.of.Pets.mp4",
            "The.Secret.Life.of.Pets.2016.HDRiP.AAC-LC.x264-LEGi0N",
            "The Secret Life of Pets (2019) - Upscaled - 720p - DesiSCR-Rip Hindi - x264 - AC3 - 5.1 Mafiaking -M2Tv",
            "The Secret Life of Pets 2017 TELESYNC X264 AC3 MAXPRO",
            "01.The Secret Life of Pets.mp4",
            "The.Secret.Life.of.Pets.UNRATED.720p.BRRip.x264.AAC-ETRG",
            "The Secret Life of Pets (2012) 720p BluRay - x265 HEVC -972MB - ShAaN",
            "[ www.Speed.cd ] -The.Secret.Life.of.Pets.S07E07.720p.HDTV.X264-DIMENSION",
            "The.Secret.Life.Of.Pets.s02e20.rus.eng.720p.Kybik.v.Kybe",
            "the_secret_life_of_pets.8x12.death_in_heaven.720p_hdtv_x264-fov",
            "the_secret_life_of_pets",
            "[thing] The_Secret_Life_of_Pets 3801.mov",
            "[720pMkv.Com]_the.secret.life.of.pets.s05e10.480p.BluRay.x264-GAnGSteR",
            "The Secret Life of Pets (2014) Dual Audio WEB-DL 720p MKV x264.mov",
            "the_secret_life_of_pets_(2014) Dual Audio 480p.BluRay.x264-GAnGSteR.mov",
            "02. TheSecretLifeofPets.mp4",
        ],
        output: ('The Secret Life of Pets'),
    },
];
const torrentName = require('torrent-name-parser');
const torrentNameFix = fileName => (torrentName(fileName).title || '').replace(/^[\d]{1,5}\./, '').replace(/\./g, ' ').trim()

console.log(dataset.map(item => torrentNameFix(item.input)))