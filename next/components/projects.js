import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  FaArrowRight,
  FaCrown,
  FaExternalLinkSquareAlt,
  FaGithub,
} from "react-icons/fa";
import { CardTitle } from "./card";
import { formatAsMonthDate } from "../lib/date";

export const ProjectCard = ({ project }) => (
  // FIXME this shold use LinkOverlay
  // https://chakra-ui.com/docs/components/link-overlay

  <LinkBox display="flex" alignItems="stretch">
    <Card w="100%" backgroundColor="white">
      <CardBody>
        <Image
          borderWidth={1}
          borderStyle="solid"
          mb={6}
          borderRadius="lg"
          objectFit="cover"
          w="100%"
          h="185px"
          src={project.frontMatter.photo}
          alt={project.frontMatter["photo-alt"]}
        />

        <CardTitle level={3}>{project.frontMatter.title}</CardTitle>
        <Text textStyle="subtitle">
          {formatAsMonthDate(project.frontMatter.date)}
        </Text>
        <Text noOfLines={3}>{project.frontMatter.description}</Text>
      </CardBody>
      <CardFooter pt={0}>
        <ButtonGroup flexGrow={1}>
          <NextLink
            href={project.href}
            passHref
            // FIXME find a way to do this without double anchor or legacy mode.
            legacyBehavior
          >
            <LinkOverlay>
              <Button variant="outline" as="span" rightIcon={<FaArrowRight />}>
                Read
              </Button>
            </LinkOverlay>
          </NextLink>
          {project.frontMatter.repo && project.frontMatter.username && (
            <IconButton
              as="a"
              href={new URL(
                `/${project.frontMatter.username}/${project.frontMatter.repo}`,
                `https://github.com`
              ).toString()}
              variant="ghost"
              icon={<FaGithub />}
            />
          )}
          {project.frontMatter.webpage && (
            <IconButton
              as="a"
              href={project.frontMatter.webpage}
              variant="ghost"
              icon={<FaExternalLinkSquareAlt />}
            />
          )}
        </ButtonGroup>
        {project.frontMatter.featured && (
          <Box
            display="inline-flex"
            height={10}
            width={10}
            alignItems="center"
            justifyContent="center"
            color="yellow.500"
          >
            <FaCrown />
          </Box>
        )}
      </CardFooter>
    </Card>
  </LinkBox>
);

export const ProjectCollection = ({ projects, columns = [1, 2, null, 3] }) => (
  <SimpleGrid columns={columns} spacing={6}>
    {projects.map((project) => (
      <ProjectCard project={project} key={project.filePath} />
    ))}
  </SimpleGrid>
);
